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
  getDoc,
  Timestamp,
  setDoc,
  FieldValue,
} from "firebase/firestore";
import { TChatResponse } from "@/types/chat";

export const getMessagesFromLatestRoom = async (
  userId: string
): Promise<{
  roomId: string;
  messages: {
    type: "user" | "bot";
    content: string | TChatResponse;
    id?: string;
  }[];
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
        id: doc.id,
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
): Promise<string | null> => {
  try {
    const messagesCollection = collection(
      db,
      "chatSessions",
      userId,
      "rooms",
      roomId,
      "messages"
    );

    // 한 번에 user와 bot 메시지를 같은 도큐먼트에 저장하고, 해당 문서 참조를 반환받음
    const docRef = await addDoc(messagesCollection, {
      user: userMessage,
      bot: botMessage,
      timestamp: serverTimestamp(),
      dislike: false,
    });

    // 채팅방의 timestamp 업데이트 (가장 최근 메시지 기준)
    const roomRef = doc(db, "chatSessions", userId, "rooms", roomId);

    // userMessage가 빈 문자열이 아닐 때만 roomName을 업데이트
    const roomUpdateData: { timestamp: FieldValue; roomName?: string } = {
      timestamp: serverTimestamp(),
    };

    if (userMessage.trim() !== "") {
      roomUpdateData.roomName = userMessage; // roomName을 사용자의 최근 질문으로 업데이트
    }

    await updateDoc(roomRef, roomUpdateData);

    // 성공적으로 메시지가 저장되었으므로 doc.id 반환
    return docRef.id;
  } catch (error) {
    console.error("메시지 추가 중 에러 발생: ", error);
    return null; // 에러 발생 시 null 반환
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

export const getMessageById = async (
  userId: string,
  roomId: string,
  messageId: string
) => {
  try {
    const messageDocRef = doc(
      db,
      "chatSessions",
      userId,
      "rooms",
      roomId,
      "messages",
      messageId
    );

    const messageSnapshot = await getDoc(messageDocRef);

    if (messageSnapshot.exists()) {
      const messageData = messageSnapshot.data();

      return {
        id: messageSnapshot.id,
        userMessage: messageData?.user as string,
        botMessage: messageData?.bot as TChatResponse,
        timestamp: messageData?.timestamp?.toDate(),
        // dislike: messageData?.dislike as boolean,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveMessageToShareMessages = async (message: {
  id: string;
  userMessage: string;
  botMessage: TChatResponse;
  timestamp: Timestamp;
}) => {
  try {
    const messageDocRef = doc(db, "shareMessages", message.id); // 해당 messageId의 문서 참조
    const docSnapshot = await getDoc(messageDocRef); // 문서 존재 여부 확인

    if (docSnapshot.exists()) {
      return; // 이미 존재하면 return
    }

    // 문서가 존재하지 않으면 새로 저장
    await setDoc(messageDocRef, {
      user: message.userMessage,
      bot: message.botMessage,
      timestamp: message.timestamp,
      dislike: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getSharedMessageById = async (messageId: string) => {
  try {
    const sharedMessageRef = doc(db, "shareMessages", messageId);
    const sharedMessageSnap = await getDoc(sharedMessageRef);

    if (sharedMessageSnap.exists()) {
      return sharedMessageSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching shared message document: ", error);
    return null;
  }
};

// 사이드바의 채팅방 목록에서 호출하는 함수
export const getMessagesByUserIdAndRoomId = async (
  userId: string,
  roomId: string
): Promise<{
  roomId: string;
  messages: {
    type: "user" | "bot";
    content: string | TChatResponse;
    id?: string;
  }[];
}> => {
  try {
    const messagesCollection = collection(
      db,
      "chatSessions",
      userId,
      "rooms",
      roomId,
      "messages"
    );
    const messagesQuery = query(
      messagesCollection,
      orderBy("timestamp", "asc")
    );
    const messagesSnapshot = await getDocs(messagesQuery);

    const messages = messagesSnapshot.docs.flatMap((doc) => {
      const data = doc.data();
      const result = [];

      if (data.user && data.user.trim() !== "") {
        result.push({
          type: "user" as const,
          content: data.user as string,
        });
      }

      if (data.bot) {
        result.push({
          type: "bot" as const,
          content: data.bot as TChatResponse,
          id: doc.id,
        });
      }

      return result;
    });

    return { roomId, messages };
  } catch (error) {
    console.error(error);
    return { roomId, messages: [] };
  }
};
