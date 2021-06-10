import firebase from "firebase/app";

export const getURL = async (word) => {
  const wordRef = firebase.storage().ref().child(`${word}.wav`)
  try {
    const url = await wordRef.getDownloadURL();
    return url
  } catch (error) {

  }
  return
}

export const create = async (word, base64) => {
  const wordRef = firebase.storage().ref().child(`${word}.wav`)

  await wordRef.putString(base64, "base64", {
    cacheControl: "public,max-age=604800",
  })
}