import { message } from "antd";
import firebase from "firebase/app";
import _ from "lodash"

export const getAllDocs = async () => {
  const docs = await firebase.firestore().collection("words").get()
  return (docs.docs.map(doc => doc.data()))
}

export const getRandomWord = (() => {
  let time = Date.now();
  let docs = [];
  return async () => {
    if (!docs.length || Date.now() - time > 30 * 60) {
      time = Date.now()
      docs = await getAllDocs();
    }

    return _.shuffle(docs)[0]
  }
})()

export const addWord = async (word) => {
  await firebase.firestore().collection("words").add(word)
  message.success("Đã thêm từ mới!")
}