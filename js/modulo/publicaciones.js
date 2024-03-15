  // Importar las bibliotecas de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, onValue, set, child, get} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider,signOut  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";
import { app, auth, analytics, database, provider} from "../controller/firebase.js";
const storage = getStorage(app);
document.getElementById('uploadBtn').addEventListener('click', handleUpload);


function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const storageRef = ref(storage, 'videos/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    // Muestra la barra de progreso durante la carga del archivo
    const progressBar = document.getElementById('progressBar');
    progressBar.style.display = 'block';
    
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.value = progress;
      },
      (error) => {
        console.error('Error al subir el archivo:', error);
      },
      () => {
        console.log('¡Archivo subido exitosamente!');
// Obtén la URL de descarga del archivo subido
getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  console.log('URL de descarga:', downloadURL);
  // Obtén el elemento de video
  const videoPlayer = document.getElementById('videoPlayer');
  // Crear un elemento video en el HTML y establecer su src con la URL de descarga
  const videoElement = document.createElement('video');
  videoElement.src = downloadURL;
  videoElement.controls = true; // Habilitar controles de reproducción
  // Reemplazar el contenido del elemento videoPlayer con el nuevo video
  videoPlayer.innerHTML = ''; // Limpiar el contenido existente
  videoPlayer.appendChild(videoElement); // Agregar el nuevo video al videoPlayer
  videoPlayer.style.display = 'block'; // Mostrar el reproductor de video
}).catch((error) => {
  console.error('Error al obtener la URL de descarga:', error);
});

      }
    );
  }
  
   