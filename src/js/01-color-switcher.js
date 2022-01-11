import {getRandomHexColor} from './modules/generatorColor'
const body = document.querySelector("body")
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
startBtn.addEventListener('click', onChengeBg)
stopBtn.addEventListener('click', stopChengeColor)
let interval = null;
function onChengeBg(){
    interval = setInterval(()=>{
    body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    startBtn.setAttribute("disabled", "disabled")
    console.log(startBtn.type)
    stopBtn.removeAttribute("disabled")
   console.log(interval)
}

function stopChengeColor(){
    startBtn.removeAttribute("disabled")
    stopBtn.setAttribute("disabled", "disabled")
    console.log(interval)
    clearInterval(interval)
}






console.log(startBtn)
