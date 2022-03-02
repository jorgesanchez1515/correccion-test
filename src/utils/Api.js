import firebaseApp from "./Firebase";
import * as firebase from "firebase";
const db = firebase.firestore(firebaseApp);

export async function isWaitingAnswers(uid) {
    const response = await db
      .collection("waiting")
      .doc(uid)
      .get();
  //    console.log(response);
  return response.exists;
  }