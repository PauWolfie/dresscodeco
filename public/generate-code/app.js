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

var clipboardValue;
var popupClosed = false;

// Function to add a document to the videoIds collection
async function addVideoIdToCollection() {
    const videoId = document.getElementById('videoId').value;
    const videoIdsCollection = collection(db, 'videos');

    if (videoId == '') {
        alert('Por favor ingresa un ID de video');
        return;
    }

    const videoNode = {
        driveId: cleanUrlData(videoId),
    }
    const newDocumentRef = await addDoc(videoIdsCollection, videoNode);

    clipboardValue = newDocumentRef.id;
    document.getElementById('documentIdRef').innerHTML = 'El id del usuario es: ' + newDocumentRef.id;
    document.getElementById('clipboard').style.display = 'initial';
}

function cleanUrlData(url) {
    const ultimaBarraIndex = url.lastIndexOf('/');
    const urlBase = url.substring(0, ultimaBarraIndex + 1);
    return urlBase;
}

function copyToClipboard() {
    togglePopup();

    // Create a temporary textarea element
    var textarea = document.createElement("textarea");

    // Set the value of the textarea to the text you want to copy
    textarea.value = clipboardValue;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the textarea from the document
    document.body.removeChild(textarea);
}

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

document.getElementById('searchButton').addEventListener('click', addVideoIdToCollection);
document.getElementById('clipboard').addEventListener('click', copyToClipboard);
document.getElementById("close-popup").addEventListener("click", togglePopup);