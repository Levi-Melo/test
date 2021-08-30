// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import * as file from "./index.jpeg";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC-LsmP5AVTmjrkaoGOnJd-XnQA58RsJtw",
  authDomain: "teste-d1690.firebaseapp.com",
  projectId: "teste-d1690",
  storageBucket: "teste-d1690.appspot.com",
  messagingSenderId: "817247009037",
  appId: "1:817247009037:web:1871a8dd5f5e0c8ce75844",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: "image/jpeg",
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, "images/" + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(
  "state_changed",
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        break;
      case "storage/canceled":
        // User canceled the upload
        break;

      // ...

      case "storage/unknown":
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  },
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
    });
  }
);
