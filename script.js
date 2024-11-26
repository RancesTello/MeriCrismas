const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; // Símbolo del copo de nieve
    snowflake.style.left = Math.random() * 100 + 'vw'; // Posición aleatoria horizontal
    snowflake.style.animationDuration = Math.random() * 3 + 5 + 's'; // Duración entre 5 y 8 segundos
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px'; // Tamaño entre 10px y 20px

    snowContainer.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove(); // Elimina el copo después de que termina la animación
    }, 8000);
}

setInterval(createSnowflake, 200); // Genera un copo cada 200ms

const countdownE1s = document.querySelectorAll(".countdown")
countdownE1s.forEach(countdownE1 =>
    createCountdown(countdownE1))

    function createCountdown(countdownE1){
        const target = new Date(new Date(countdownE1.dataset.targetDate).toLocaleDateString('En', ))
        const parts = {
            days: {text: ["dias","dia"], dots: 30},
            hours: {text: ["horas","hora"], dots: 24},
            minutes: {text: ["minutos","minuto"], dots: 60},
            seconds: {text: ["segundos","segundo"], dots: 60},
        }
        Object.entries(parts).forEach(([key,value])=>{
            const partE1 = document.createElement("div");
            partE1.classList.add("part", key);
            partE1.style.setProperty("--dots",value.dots);
            value.element = partE1;

            const remainingE1 = document.createElement("div");
            remainingE1.classList.add("remaining");
            remainingE1.innerHTML = `
            <span class="number"></span>
            <span class="text"></span>
            `
            partE1.append(remainingE1);
            for(let i=0; i< value.dots; i++){
                const dotContainerE1= document.createElement("div");
                dotContainerE1.style.setProperty("--dot-idx",i);
                dotContainerE1.classList.add("dot-container")
                const dotE1 = document.createElement("div");
                dotE1.classList.add("dot")
                dotContainerE1.append(dotE1);
                partE1.append(dotContainerE1);
            }
            countdownE1.append(partE1);
        })
        getRemainingTime(target,parts)
    }

function getRemainingTime(target,parts, first=true){
    const now = new Date()
    if(first) console.log({target,now})
    const remaining = {}
let seconds = Math.floor((target-(now))/1000);
let minutes = Math.floor(seconds/60);
let hours = Math.floor(minutes/60);
let days = Math.floor(hours/24);
hours = hours-(days*24);
minutes = minutes-(days*24*60)-(hours*60);
seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
Object.entries({days,hours,minutes,seconds}).forEach(([key,value])=>{
    const remaining = parts[key].element.querySelector(".number");
    const text = parts[key].element.querySelector(".text");
    remaining.innerText = value;
    text.innerText= parts[key].text[Number(value==1)]
    const dots = parts[key].element.querySelectorAll(".dot")
    dots.forEach((dot,idx)=>{
        dot.dataset.active = idx <= value;
        dot.dataset.lastactive = idx == value;
    })
})
if(now <= target){
    window.requestAnimationFrame(()=>{
        getRemainingTime(target,parts,false)
    })
}
}


var player = document.getElementById("player");
let progress = document.getElementById("progress");
let playbtn = document.getElementById("playbtn");

var playpause = function () {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

playbtn.addEventListener("click", playpause);

player.onplay = function () {
  playbtn.classList.remove("fa-play");
  playbtn.classList.add("fa-pause");
}

player.onpause = function () {
  playbtn.classList.add("fa-play");
  playbtn.classList.remove("fa-pause");
}

player.ontimeupdate = function () {
  let ct = player.currentTime;
  current.innerHTML = timeFormat(ct);
  //progress
  let duration = player.duration;
  prog = Math.floor((ct * 100) / duration);
  progress.style.setProperty("--progress", prog + "%");
}

function timeFormat(ct) {
  minutes = Math.floor(ct / 60);
  seconds = Math.floor(ct % 60);

  if (seconds < 10) {
    seconds = "0"+seconds;
  }

  return minutes + ":" + seconds;
}