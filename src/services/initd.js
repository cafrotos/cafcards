import { firebaseConfig } from "configs";
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

firebase.initializeApp(firebaseConfig)
firebase.auth().languageCode = "vi-VN"
