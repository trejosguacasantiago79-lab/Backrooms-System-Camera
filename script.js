/* ==========================================
   BACKROOMS SURVEILLANCE SYSTEM
   BUILD 1.0 RELEASE
==========================================*/

"use strict";

/* ==========================================
   ELEMENTOS DEL DOM
==========================================*/

const loadingScreen = document.getElementById("loadingScreen");
const loadingFill = document.getElementById("loadingFill");
const loadingStatus = document.getElementById("loadingStatus");

const system = document.getElementById("system");

const camera = document.getElementById("camera");
const cameraTitle = document.getElementById("cameraTitle");
const cameraLocation = document.getElementById("cameraLocation");

const cameraName = document.getElementById("cameraName");
const cameraStatus = document.getElementById("cameraStatus");
const signal = document.getElementById("signal");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const cameraButtons = document.querySelectorAll(".cameraButton");

const clock = document.getElementById("clock");
const date = document.getElementById("date");

const flash = document.getElementById("flash");
const systemAlert = document.getElementById("systemAlert");
const glitchLayer = document.querySelector(".cameraGlitch");

/* ==========================================
   AUDIO
==========================================*/

const clickSound = document.getElementById("clickSound");
const ambientSound = document.getElementById("ambientSound");

/* ==========================================
   CONFIGURACIÓN
==========================================*/

let currentCamera = 0;
let audioUnlocked = false;

/* ==========================================
   DESBLOQUEO DEL AUDIO
==========================================*/

function unlockAudio(){

    if(audioUnlocked) return;

    audioUnlocked = true;

    ambientSound.volume = 0.18;

    ambientSound.play().catch(()=>{});

}

document.addEventListener("click", unlockAudio, { once:true });

/* ==========================================
   LISTA DE CÁMARAS
==========================================*/

const cameras = [
    {
        title:"CAM-01",
        location:"LOBBY",
        image:"img/cam1.png"
    },

    {
        title:"CAM-02",
        location:"POOLROOMS",
        image:"img/cam2.png"
    },

    {
        title:"CAM-03",
        location:"POOLROOMS #2",
        image:"img/cam3.png"
    },

    {
        title:"CAM-04",
        location:"SLIDE BLACK",
        image:"img/cam4.png"
    },

    {
        title:"CAM-05",
        location:"INFINITE ROOMS",
        image:"img/cam5.png"
    },

    {
        title:"CAM-06",
        location:"MOTION",
        image:"img/cam6.png"
    },

    {
        title:"CAM-07",
        location:"DREAMCORE",
        image:"img/cam7.png"
    },

    {
        title:"CAM-08",
        location:"HALLWAYS",
        image:"img/cam8.png"
    },

    {
        title:"CAM-09",
        location:"HOTEL",
        image:"img/cam9.png"
    },

    {
        title:"CAM-10",
        location:"PLAYROOMS",
        image:"img/cam10.png"
    },

    {
        title:"CAM-11",
        location:"BACKROOMS",
        image:"img/cam11.png"
    },

    {
        title:"CAM-12",
        location:"???",
        image:"img/cam12.png"
    }

];

/* ==========================================
   RELOJ Y FECHA
==========================================*/

function updateClock(){

    const now = new Date();

    clock.textContent = now.toLocaleTimeString("es-CO",{
        hour12:false
    });

    date.textContent = now.toLocaleDateString("es-CO");

}

setInterval(updateClock,1000);
updateClock();

/* ==========================================
   LOADING
==========================================*/

const loadingMessages=[

    "Initializing System...",
    "Loading Camera Network...",
    "Synchronizing Signals...",
    "Connecting Cameras...",
    "Authenticating Access...",
    "System Online"

];

function startLoading(){

    let progress=0;
    let message=0;

    const interval=setInterval(()=>{

        progress++;

        loadingFill.style.width=progress+"%";

        if(progress%18===0 && message<loadingMessages.length-1){

            message++;

            loadingStatus.textContent=loadingMessages[message];

        }

        if(progress>=100){

            clearInterval(interval);

            setTimeout(()=>{

                loadingScreen.style.display="none";

                system.classList.remove("hidden");

                // Sonido de encendido
                clickSound.currentTime = 0;
                clickSound.volume = 0.5;
                clickSound.play().catch(() => {});

                // Ambiente
                ambientSound.currentTime = 0;
                ambientSound.volume = 0.18;
                ambientSound.play().catch(() => {});

            },500);

        }

    },35);

}

startLoading();

/* ==========================================
   SISTEMA DE CÁMARAS
==========================================*/

function updateCamera(){

    const cam = cameras[currentCamera];

    camera.src = cam.image;

    cameraTitle.textContent = cam.title;
    cameraLocation.textContent = cam.location;

    cameraName.textContent = cam.title;

    cameraStatus.textContent = "LIVE";

    signal.textContent =
        Math.floor(Math.random()*16+85)+"%";

    cameraButtons.forEach((button,index)=>{

        button.classList.toggle(
            "active",
            index===currentCamera
        );

    });

}

/* ==========================================
   FLASH
==========================================*/

function triggerFlash(){

    flash.classList.add("active");

    setTimeout(()=>{

        flash.classList.remove("active");

    },220);

}

/* ==========================================
   GLITCH
==========================================*/

function triggerGlitch(){

    if(!glitchLayer) return;

    glitchLayer.classList.add("active");

    setTimeout(()=>{

        glitchLayer.classList.remove("active");

    },180);

}

/* ==========================================
   SONIDO
==========================================*/

function playClick(){

    if(!audioUnlocked) return;

    clickSound.pause();

    clickSound.currentTime=0;

    clickSound.volume=0.45;

    clickSound.play().catch(()=>{});

}

/* ==========================================
   CAMBIAR CÁMARA
==========================================*/

function switchCamera(index){

    if(index<0){

        index=cameras.length-1;

    }

    if(index>=cameras.length){

        index=0;

    }

    currentCamera=index;

    playClick();

    triggerFlash();

    triggerGlitch();

    updateCamera();

}

/* ==========================================
   CÁMARA INICIAL
==========================================*/

updateCamera();

/* ==========================================
   CONTROLES
==========================================*/

nextButton.addEventListener("click",()=>{

    switchCamera(currentCamera+1);

});

previousButton.addEventListener("click",()=>{

    switchCamera(currentCamera-1);

});

/* ==========================================
   BOTONES DE CÁMARAS
==========================================*/

cameraButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const id=Number(button.dataset.id);

        switchCamera(id);

    });

});

/* ==========================================
   ATAJOS DE TECLADO
==========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="ArrowRight"){

        switchCamera(currentCamera+1);

    }

    if(event.key==="ArrowLeft"){

        switchCamera(currentCamera-1);

    }

});

/* ==========================================
   PANTALLA COMPLETA
==========================================*/

camera.addEventListener("dblclick",()=>{

    if(document.fullscreenElement){

        document.exitFullscreen();

    }else{

        camera.requestFullscreen().catch(()=>{});

    }

});

/* ==========================================
   ANTI DRAG
==========================================*/

camera.draggable=false;

/* ==========================================
   BLOQUEO MENÚ CONTEXTUAL
==========================================*/

document.addEventListener("contextmenu",(event)=>{

    event.preventDefault();

});

/* ==========================================
   GLITCH ALEATORIO
==========================================*/

setInterval(()=>{

    if(Math.random()<0.08){

        triggerGlitch();

    }

},4500);

/* ==========================================
   MENSAJE DE CONSOLA
==========================================*/

console.clear();

console.log(
"%cBACKROOMS SURVEILLANCE SYSTEM",
"color:#4cff73;font-size:20px;font-weight:bold;font-family:monospace;"
);

console.log(
"%cBUILD 1.0 RELEASE",
"color:#9effb2;font-size:13px;"
);

console.log(
"%cSYSTEM ONLINE",
"color:#4cff73;"
);