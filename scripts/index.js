let ataqueJugador;
let ataqueRival;
let vidasJugador = "❤️".repeat(3);
let vidasRival = "❤️".repeat(3);

let btnFuego = llamado("btnFuego");
btnFuego.addEventListener("click", ataqueFuego);
let btnAgua = llamado("btnAgua");
btnAgua.addEventListener("click", ataqueAgua);
let btnTierra = llamado("btnTierra");
btnTierra.addEventListener("click", ataqueTierra);

let btnReiniciar = llamado("reiniciar");
btnReiniciar.addEventListener("click", reiniciar);

const mascotas = {
  Hipodoge: "../assets/hipodoge.png",
  Capipepo: "../assets/capipepo.png",
  Ratigueya: "../assets/ratigueya.png"
};

const fondos = {
  Hipodoge:'#0267c1',
  Capipepo:'#06a736',
  Ratigueya:'#d65108',
}

//Extra: acortamos el codigo que llama las equiquetas en html
function llamado(id) {
  return document.getElementById(id);
}

//Paso 2: seleccionamos la mascota y el ataque
function inicioJuego() {
  llamado("btnMascota").addEventListener("click", seleccionMascota);

  llamado("seleccion-ataque").style.display = 'none'
  llamado("reiniciar").style.display = 'none'
}

//Paso 3: Enunciado de la mascota que se eligio
function seleccionMascota() {
  let spanMascota = llamado("mascota-jugador");
  let imgJugador = llamado("imgJugador")
  let fondo = llamado("jugador")

  llamado("seleccion-ataque").style.display = 'flex'
  llamado("seleccion-mascota").style.display = 'none'

  if (llamado("hipodoge").checked) {
    spanMascota.innerHTML = `Hipodoge`;
    imgJugador.src = mascotas["Hipodoge"]
    fondo.style.background = '#0267c1';
  } else if (llamado("capipepo").checked) {
    spanMascota.innerHTML = "Capipepo";
    imgJugador.src = mascotas["Capipepo"]
    fondo.style.background = '#06a736';
  } else if (llamado("ratigueya").checked) {
    spanMascota.innerHTML = "Ratigueya";
    imgJugador.src = mascotas['Ratigueya']
    fondo.style.background = '#d65108';
  } else {
    alert("ERROR: Selecciona una mascota");
  }

  SeleccionEnemigo();
}

//Extra: Accion aleatoria
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Paso 3: Se muestra la mascota del rival
function SeleccionEnemigo() {
  let mascotaAleatoria = aleatorio(0, 2);
  const opciones = ["Hipodoge", "Capipepo", "Ratigueya"];

  llamado('imgRival').src = mascotas[opciones[mascotaAleatoria]];

  llamado('rival').style.background = fondos[opciones[mascotaAleatoria]];

  llamado("mascota-rival").innerHTML = opciones[mascotaAleatoria];
}

//paso 4: Se lanza el poder del jugador
function ataqueFuego() {
  ataqueJugador = "🔥";
  ataqueAleatorioRival();
}
function ataqueAgua() {
  ataqueJugador = "💧";
  ataqueAleatorioRival();
}
function ataqueTierra() {
  ataqueJugador = "🌱";
  ataqueAleatorioRival();
}

//Paso 4: Se lanza el poder del rival
function ataqueAleatorioRival() {
  const ataques = ["🔥", "💧", "🌱"];
  ataqueRival = ataques[aleatorio(0, 2)];

  combate();
}

//Paso 5: Se determina si se gana o se pierde
function combate() {
  if (ataqueJugador == ataqueRival) {
    crearMensaje("Empate");
  } else if (
    (ataqueJugador == "🔥" && ataqueRival == "🌱") ||
    (ataqueJugador == "💧" && ataqueRival == "🔥") ||
    (ataqueJugador == "🌱" && ataqueRival == "💧")
  ) {
    crearMensaje("Ganaste");
    vidasRival = vidasRival.slice(0, -2);
    llamado("vidas-rival").innerHTML = vidasRival;
    llamado("imgRival").style.animation = "tambaleo 0.5s";

  } else {
    crearMensaje("Perdiste");
    vidasJugador = vidasJugador.slice(0, -2);
    llamado("vidas-jugador").innerHTML = vidasJugador;
    llamado("imgJugador").style.animation = "tambaleo 0.5s";
  }

  setTimeout(function() {
    llamado("imgJugador").style.animation = "";
    llamado("imgRival").style.animation = "";
  }, 500);

  totalVidas();
}

//Paso 6: Se muestrasn los acaques
function crearMensaje(resultado) {

  llamado('resultado').innerHTML =resultado
  llamado('ataque-jugador').innerHTML = ataqueJugador
  llamado('ataque-rival').innerHTML = ataqueRival 
  llamado('resultado').setAttribute("class", "consecuencia")

}

//Paso 7: se desactivan los poderes
function totalVidas() {

  if (vidasRival == 0) {
    llamado('titulo').innerHTML = "VICTORIA";
    llamado('titulo').setAttribute("id", "victoria")
    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;
    llamado("reiniciar").style.display = 'block'
  } else if (vidasJugador == 0) {
    llamado('titulo').innerHTML = "DERROTA";
    llamado('titulo').setAttribute("id", "derrota")
    btnFuego.disabled = true;
    btnAgua.disabled = true;
    btnTierra.disabled = true;
    llamado("reiniciar").style.display = 'block'
  }

}

function reiniciar() {
  location.reload();
}

//Paso 1: Iniciamos el juego si la pestaña se carga
window.addEventListener("load", inicioJuego);
