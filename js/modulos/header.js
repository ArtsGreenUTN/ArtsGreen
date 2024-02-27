// Importar las bibliotecas de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app, auth, analytics, database, provider} from "../controladore/firebase.js";
import { session } from "../iniciador/main.js";

const base =`<div class="row flex-nowrap justify-content-between align-items-center">
  <div class="col-4 pt-1">
    <a class="link-secondary" href="#">Subscribe</a>
  </div>
  <div class="col-4 text-center">
    <a class="blog-header-logo text-body-emphasis text-decoration-none" href="#">ArtsGreen</a>
  </div>
  <div class="col-4 d-flex justify-content-end align-items-center">
    <a class="link-secondary" href="#" aria-label="Search">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
    </a>
    <button class="btn btn-sm btn-outline-danger" id="logoutg">Cerrar sesión</button>
  </div>
</div>
`;
const login =`<div class="row flex-nowrap justify-content-between align-items-center">
<div class="col-4 pt-1">
  <a class="link-secondary" href="#">Subscribe</a>
</div>
<div class="col-4 text-center">
  <a class="blog-header-logo text-body-emphasis text-decoration-none" href="#">ArtsGreen</a>
</div>
<div class="col-4 d-flex justify-content-end align-items-center">
  <a class="link-secondary" href="#" aria-label="Search">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"/><path d="M21 21l-5.2-5.2"/></svg>
  </a>
  <button class="btn btn-sm btn-outline-secondary" href="#" data-bs-toggle="modal" data-bs-target="#login">Iniciar sesión</button>
  <div class="modal fade" id="login" tabindex="-1" aria-labelledby="login" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Inicio/Registro de cuenta</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p>Autenticación por correo electrónico y contraseña:</p>
      <input type="email" id="email" placeholder="Correo electrónico"><br>
      <input type="password" id="password" placeholder="Contraseña"><br>
      <button id="bloginc">Iniciar sesión</button>

      <p>Registrar correo:</p>
      <input type="email" id="Remail" placeholder="Correo electrónico"><br>
      <input type="password" id="Rpassword" placeholder="Contraseña"><br>
      <input type="password" id="Rpasswordrep" placeholder="Repetir contraseña"><br>
      <button id="bregister">Registrar</button>
      
      <p>Autenticación con Google:</p>
      <button id="bloging">Iniciar sesión con Google</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
  </div>
</div>`;

// Función para iniciar sesión con correo y contraseña
function signInWithEmailAndPassword() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Autenticación exitosa con correo y contraseña
      const user = userCredential.user;
      console.log('Usuario autenticado:', user);
    })
    .catch((error) => {
      // Manejar errores de autenticación con correo y contraseña
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error al autenticar con correo y contraseña:', errorMessage);
    });
}

// Función para registrar una nueva cuenta con correo y contraseña
function registerWithEmailAndPassword() {
  const email = document.getElementById('Remail').value;
  const password = document.getElementById('Rpassword').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registro exitoso de una nueva cuenta con correo y contraseña
      const user = userCredential.user;
      console.log('Nueva cuenta registrada:', user);
    })
    .catch((error) => {
      // Manejar errores de registro con correo y contraseña
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error al registrar una nueva cuenta:', errorMessage);
    });
}
// Función para iniciar sesión con Google
function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      actualizarHeader();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

// Función para cambiar el contenido del header según el estado de autenticación del usuario
function actualizarHeader() {
  const header = document.getElementById('header');
  if (session) {
    console.log("Usuario autenticado");
    header.innerHTML = base;
    let logutg=document.getElementById('logutg');
  } else {
    console.log("Usuario no autenticado");
    header.innerHTML = login;
    let bloginc=document.getElementById('bloginc');
    let bloging=document.getElementById('bloging');
    let bregister=document.getElementById('bregister');
    var myModal = new bootstrap.Modal(document.getElementById('login'));
    bloging.addEventListener('click', ()=>{
      myModal.hide();
      signInWithGoogle();
    });
    bloginc.addEventListener('click', ()=>{
      signInWithEmailAndPassword();
      myModal.hide();
    });
    bregister.addEventListener('click', ()=>{
      registerWithEmailAndPassword();
      myModal.hide();
    });
  }
}

// Llamar a la función para actualizar el header
actualizarHeader();