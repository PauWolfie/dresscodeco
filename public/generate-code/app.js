// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjVvMXfZdPt7NXHQLyWx-UgvJFoBPfv3s",
    authDomain: "dresscode-co.firebaseapp.com",
    projectId: "dresscode-co",
    storageBucket: "dresscode-co.appspot.com",
    messagingSenderId: "326997647745",
    appId: "1:326997647745:web:182d65878e58299ffa0880",
    measurementId: "G-RLSQ0SBGR7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Function to add a document to the videoIds collection
async function addVideoIdToCollection() {
    const videoId = document.getElementById('videoId').value;
    const videoIdsCollection = collection(db, 'videos');

    if (videoId == '') {
        alert('Por favor ingresa un ID de video');
        return;
    }

    const videoNode = {
        vimeoId: videoId,
    }
    const newDocumentRef = await addDoc(videoIdsCollection, videoNode);

    document.getElementById('documentIdRef').innerHTML = 'The user id is: ' + newDocumentRef.id;
}

document.getElementById('searchButton').addEventListener('click', addVideoIdToCollection);
