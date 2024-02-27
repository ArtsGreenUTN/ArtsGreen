// Importar las bibliotecas de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider,signOut  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { app, auth, analytics, database, provider} from "../controladore/firebase.js";


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

// Función para iniciar sesión con Google
function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      
      subirUsuario(user.email,user.displayName,user.metadata.creationTime,user.photoURL,user.reloadUserInfo.localId)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
function cerrarSesion() {
  console.log('Cerrar Sesion');
  signOut(auth).then(() => {
  }).catch((error) => {
  });
}

// Función para configurar la escucha en tiempo real en la base de datos
function configurarEscuchaEnTiempoReal() {
  const dbRef = ref(database, "videos");
  onValue(dbRef, (snapshot) => {
    const videos = snapshot.val();
    console.log("Nuevos cambios en la base de datos:");
    console.log(videos);
  });
}

// Llamar a la función para configurar la escucha en tiempo real
configurarEscuchaEnTiempoReal();

 
function subirUsuario(mail,name,fechaCreate,photo,id){
  function writeUserData() {
    set(ref(database, 'users/' + id), {
      username: name,
      email: mail,
      profile_picture : photo,
      fecha: fechaCreate
    });
  }
  writeUserData();
};
const header = document.getElementById('header');
// Función para obtener los detalles del usuario

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario autenticado");
    header.innerHTML=base;
    console.log(user);
    let logoutg = document.getElementById('logoutg');
    logoutg.addEventListener('click', () => { 
      cerrarSesion();
    });
  } else {
    console.log("Usuario no autenticado");
    header.innerHTML=login;
    let bloging=document.getElementById('bloging');
    var myModal = new bootstrap.Modal(document.getElementById('login'));
    bloging.addEventListener('click', ()=>{
        myModal.hide();
        signInWithGoogle();
      
    })
  }
});


