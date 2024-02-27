// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { onAuthStateChanged,signInWithPopup, GoogleAuthProvider   } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {app,auth,analytics,database} from "../controladore/firebase.js";


//variables personalizadas
import {} from "../modulos/header.js";
import {} from "../operadores/bd.js";
import {} from "../modulos/footer.js";
import {} from "../modulos/list.js";
import {} from "../modulos/muro.js";
import {} from "../modulos/perfil.js";
import {} from "../modulos/publicaciones.js";

var session=false; 
//funcion para que firebase verifique el uso de una cuenta
onAuthStateChanged(auth, (user) => {
    if (user) {
        session=true
    } else {
        session=false
    }
});
export{session}