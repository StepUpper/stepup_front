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
  query,
  setDoc,
  updateDoc,
  where,
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

  const userData = docSnap.data() as TUser;

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
    ...userData,
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
  await createUserWithEmailAndPassword(auth, email, password).then(
    (credential) => {
      setDoc(doc(db, "users", credential.user.uid), {
        ...rest,
        email: email,
        imgUrl: "",
        sizeType: null,
        sneakerSize: 0,
      });
    }
  );
};

const signInWithCredential = async (user: {
  email: string;
  password: string;
}) => {
  await signInWithEmailAndPassword(auth, user.email, user.password);
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  const isNew = await signInWithPopup(auth, provider)
    .then((credential) => {
      setDoc(doc(db, "users", credential.user.uid), {
        email: credential.user.email,
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

const availableAccount = async (email: string) => {
  const docRef = collection(db, "users");
  const q = query(docRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  return querySnapshot.empty;
};

export {
  getUserData,
  updateUserData,
  signUpWithCredential,
  signInWithCredential,
  signInWithGoogle,
  logOut,
  availableAccount,
};
