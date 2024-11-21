import { auth, db } from "@/firebase";
import { TUser } from "@/types/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface UserTypeforSignup {
  email: string;
  password: string;
}

const getUserData = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const likeShoesRef = collection(db, "users", uid, "likeShoes");
  const likeShoesSnap = await getDocs(likeShoesRef);
  const likeShoes = likeShoesSnap.docs.map((doc) => ({
    shoeId: doc.id,
    ...doc.data(),
  }));

  const shoeClosetRef = collection(db, "users", uid, "shoeCloset");
  const shoeClosetSnap = await getDocs(shoeClosetRef);
  const shoeCloset = shoeClosetSnap.docs.map((doc) => ({
    closetId: doc.id,
    ...doc.data(),
  }));

  return {
    uid,
    ...docSnap.data(),
    likeShoes,
    shoeCloset,
  };
};

const updateUserData = async (key: string, value: string | number) => {
  const uid = auth.currentUser?.uid;

  if (!uid) return;
  const docRef = doc(db, "users", uid);

  await updateDoc(docRef, {
    [key]: value,
  });
};

const signUpWithCredential = async (user: UserTypeforSignup & TUser) => {
  const { email, password, ...rest } = user;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      setDoc(doc(db, "users", credential.user.uid), {
        ...rest,
        imgUrl: "",
        sizeType: null,
        sneakerSize: 0,
      });
    })
    .catch((e) => alert(e));
};

const signInWithCredential = async (user: {
  email: string;
  password: string;
}) => {
  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then()
    .catch((e) => alert(e.message));
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const isNew = await signInWithPopup(auth, provider)
    .then((credential) => {
      setDoc(doc(db, "users", credential.user.uid), {
        username: credential.user.displayName,
        gender: null,
        birthDate: "",
        imgUrl: credential.user.photoURL,
        sizeType: null,
        sneakerSize: 0,
      });
      return (
        credential.user.metadata.creationTime ===
        credential.user.metadata.lastSignInTime
      );
    })
    .catch((e) => alert(e.message));
  return isNew;
};

const logOut = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.setItem("setOnboadingPage", "on");
    })
    .catch((e) => alert(e.message));
};

export {
  getUserData,
  updateUserData,
  signUpWithCredential,
  signInWithCredential,
  signInWithGoogle,
  logOut,
};
