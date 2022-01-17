import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const stringDay = document.querySelector('[data-days]');
const stringHourse = document.querySelector('[data-hours]');
const stringMinutes = document.querySelector('[data-minutes]');
const stringSecond = document.querySelector('[data-seconds]');
const progressDays = document.querySelector('.progressDays');
const progressHours = document.querySelector('.progressHours');
const progressMinutes = document.querySelector('.progressMinutes');
const progressSeconds = document.querySelector('.progressSeconds');
const dateTest = document.querySelector('.date');
const roketTitle = document.querySelector('.roketTitle');

startBtn.addEventListener('click', onStartTime)
stopBtn.addEventListener('click', onStopTimer)
startBtn.setAttribute('disabled', 'disabled')
let time = null;
let intervalTime = null

console.log(intervalTime)
function onStartTime(){
    let date = Date.now()
   
    Notify.success('Запуск ядерной ракеты активирован', {timeout: 6000,});
    roketTitle.textContent = "До запуска ядерной ракеты осталось:"
    intervalTime = setInterval(()=>{
        let date = Date.now()
        let seconds = time - date
        console.log(time)
        console.log(convertMs(seconds))
        convertMs(seconds)
        getUpdateContent(convertMs(seconds))

    },1000 )
    
}
function onStopTimer(){
    Notify.failure('Запуск ракеты остановлен');
    clearInterval(intervalTime)
}
console.log(startBtn)
const timeResult = flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    shorthandCurrentMonth: true,
    onClose(selectedDates) {
        if(selectedDates[0] <= new Date()){
            window.alert("Please choose a date in the future")
            return 
           
        }else{
            console.log("Все норм")
            startBtn.removeAttribute("disabled")
        }
      time = selectedDates[0]
    },
  });

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pud(Math.floor(ms / day));
    // Remaining hours
    const hours = pud(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pud(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pud(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
  
  function pud(value){
    return String(value).padStart(2, '0')
}

function getUpdateContent(value){
    // Loading.standard({
    //     clickToClose: true,
    //     svgSize: '19px',
    //     });
    let { days, hours, minutes, seconds } = value
    stringSecond.textContent = seconds
    stringMinutes.textContent = minutes
    stringHourse.textContent = hours
    stringDay.textContent = days
    progressDays.style.width = days+'%'
    progressHours.style.width = hours+'%'
    progressMinutes.style.width = minutes+'%'
    progressSeconds.style.width = seconds+'%'
   
}

