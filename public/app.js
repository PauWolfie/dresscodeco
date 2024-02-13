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

import { GoogleAuthProvider, signInWithPopup, getAuth } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = { };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();

var popupClosed = false;
var videoToShow = "";

async function checkUserId() {
    const videoId = document.getElementById('userId').value;
    popupClosed = false;

    if (videoId == "" || videoId.length != 20) {
        togglePopup();
        return;
    }
    const docRef = doc(db, 'videos', videoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        videoToShow = docSnap.data().driveId;
        signInWithGoogle();
    } else {
        togglePopup();
    }
}

function displayVideo() {    
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("contentDiv").style.display = "block";

    console.log('display Video: ' + videoToShow);
    document.getElementById("videoIframeElem").src = videoToShow + "/preview";
    document.getElementById("videoDownloadBtn").href = "https://drive.google.com/uc?export=download&id=" + getVideoId(videoToShow);
}

function getVideoId(url) {
    const patronID = /\/file\/d\/([^/]+)/; // Utilizamos una expresión regular para buscar el ID después de "/file/d/"
    const coincidencia = url.match(patronID);

    if (coincidencia && coincidencia[1]) {
        return coincidencia[1];
    } else {
        // Manejar el caso en el que no se encuentra un ID válido
        console.error("No se pudo extraer el ID del video de la URL proporcionada.");
        return null;
    }
};

function togglePopup() {
    if (popupClosed) return;

    var popup = document.getElementById("popup");

    if (popup.style.opacity === "0" || popup.style.opacity === "") {
        // Mostrar el popup con fade in
        popup.style.display = "block";
        setTimeout(function () {
            popup.style.opacity = "1";
        }, 100); // Pequeño retraso para asegurar que la transición se aplique correctamente
    } else {
        // Ocultar el popup si ya está visible
        popup.style.opacity = "0";
        popupClosed = true;

        // Ocultar completamente el popup después de la animación
        setTimeout(function () {
            popup.style.display = "none";
        }, 500);
    }

    setTimeout(function () {
        togglePopup();
        popupClosed = true;
    }, 5000);
}

// Function to handle Google Sign-In using Firebase Authentication
const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        displayVideo();
    } catch (error) {
        console.error('Google Sign-In failed:', error.message);
        window.location.reload();
    }
};

// Button listeners:
document.getElementById("searchButton").addEventListener("click", checkUserId);
document.getElementById("close-popup").addEventListener("click", togglePopup);
