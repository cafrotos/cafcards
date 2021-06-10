import { message } from "antd";
import firebase from "firebase/app";

/**
 * 
 * @param {keyof firebase.auth} providerName 
 */
export const loginWithProvider = (providerName) => {
  const provider = new firebase.auth[providerName]()
  firebase.auth().signInWithPopup(provider)
    .catch(err => {
      message.error(err.message)
    })
}