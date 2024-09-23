import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { TChatResponse } from "@/types/chat";

export const getMessagesFromLatestRoom = async (
  userId: string
): Promise<{
  roomId: string;
  messages: { type: "user" | "bot"; content: string | TChatResponse }[];
}> => {
  const roomsCollection = collection(db, "chatSessions", userId, "rooms");
  // 이 코드는 userId라는 도큐먼트의 하위 컬렉션 rooms에 접근하여,
  // 사용자가 생성한 모든 방에 접근할 수 있게 함
  // 그 경로에 데이터가 존재하지 않아도 roomsCollection은 유효한 참조

  const roomsQuery = query(
    roomsCollection,
    orderBy("timestamp", "desc"),
    limit(1)
  );
  const roomsSnapshot = await getDocs(roomsQuery);

  let latestRoomId: string;

  if (roomsSnapshot.empty) {
    const newRoomRef = await addDoc(roomsCollection, {
      roomName: "새로운 채팅방",
      timestamp: serverTimestamp(),
    });

    latestRoomId = newRoomRef.id;
    return { roomId: latestRoomId, messages: [] };
  } else {
    const latestRoom = roomsSnapshot.docs[0];
    latestRoomId = latestRoom.id;
  }

  const messagesCollection = collection(
    db,
    "chatSessions",
    userId,
    "rooms",
    latestRoomId,
    "messages"
  );
  const messagesQuery = query(messagesCollection, orderBy("timestamp", "asc"));
  const messagesSnapshot = await getDocs(messagesQuery);

  const messages = messagesSnapshot.docs.flatMap((doc) => {
    const data = doc.data();
    const result = [];

    // user 메시지가 빈 문자열이 아닌 경우에만 추가
    if (data.user && data.user.trim() !== "") {
      result.push({
        type: "user" as const,
        content: data.user as string,
      });
    }

    // bot 메시지가 존재하는 경우에만 추가
    if (data.bot) {
      result.push({
        type: "bot" as const,
        content: data.bot as TChatResponse,
      });
    }

    return result;
  });

  return { roomId: latestRoomId, messages };
};

export const addMessageToFirestore = async (
  userId: string,
  roomId: string,
  userMessage: string,
  botMessage: TChatResponse
) => {
  try {
    const messagesCollection = collection(
      db,
      "chatSessions",
      userId,
      "rooms",
      roomId,
      "messages"
    );

    // 한 번에 user와 bot 메시지를 같은 도큐먼트에 저장
    await addDoc(messagesCollection, {
      user: userMessage,
      bot: botMessage,
      timestamp: serverTimestamp(),
      dislike: false,
    });

    // 채팅방의 timestamp 업데이트 (가장 최근 메시지 기준)
    const roomRef = doc(db, "chatSessions", userId, "rooms", roomId);
    await updateDoc(roomRef, {
      timestamp: serverTimestamp(),
      roomName: userMessage, // roomName을 사용자의 최근 질문으로 업데이트
    });
  } catch (error) {
    console.error("메시지 추가 중 에러 발생: ", error);
  }
};

export const createNewChatRoom = async (userId: string) => {
  const roomsCollectionRef = collection(db, "chatSessions", userId, "rooms");

  try {
    const newRoomRef = await addDoc(roomsCollectionRef, {
      roomName: "새로운 채팅방",
      timestamp: serverTimestamp(),
    });

    return newRoomRef.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserChatRooms = async (userId: string) => {
  const roomsCollection = collection(db, "chatSessions", userId, "rooms");
  const roomsQuery = query(roomsCollection, orderBy("timestamp", "desc"));
  const roomsSnapshot = await getDocs(roomsQuery);

  const rooms = roomsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return rooms;
};
