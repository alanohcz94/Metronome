import Timer from "./js/timer.js";

const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decraeseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('start-stop');
const measureCount = document.querySelector('.tempo-beats');
const decraeseBeatsBtn = document.querySelector('.decrease-beats');
const increaseBeatsBtn = document.querySelector('.increase-beats');

const accentClick = new Audio('click1.mp3');
const beatClick = new Audio('click2.mp3');

let bpm = 163;
let beats = 4;
let counter = 0;
let isRunningFlag = false;
let speedText = "Easy Mode";

decraeseTempoBtn.addEventListener('click' , () => {
	if(bpm <= 40) { return };
	bpm--;
	validateTempo();
	updateTempo();
});

increaseTempoBtn.addEventListener('click' , () => {
	if(bpm >= 300) { return };
	bpm++;
	validateTempo();
	updateTempo();
});

tempoSlider.addEventListener('input', () => {
	bpm = tempoSlider.value;
	updateTempo();
})

decraeseBeatsBtn.addEventListener('click', () => {
	if(beats <= 3) { return };
	beats--;
	measureCount.textContent = beats;
	counter = 0;
})

increaseBeatsBtn.addEventListener('click', () => {
	if(beats >= 9) { return };
	beats++;
	measureCount.textContent = beats;
	counter = 0;
})

startStopBtn.addEventListener('click', () => {
	counter =0;
	if (!isRunningFlag){
		metronome.start();
		isRunningFlag = true;
		startStopBtn.textContent = "STOP";
	}
	else{
		metronome.stop();
		isRunningFlag = false;
		startStopBtn.textContent = "START";
	}
})

function updateTempo() {
	tempoDisplay.textContent = bpm;
	tempoSlider.value = bpm;
	metronome.timerInterval = 60000 / bpm;
	if (bpm <= 89) { speedText = "Easy Mode"};
	if (bpm >= 90 && bpm <= 120) { speedText = "Normal Mode"};
	if (bpm > 120 && bpm <= 160) { speedText = "Hard Mode"};
	if (bpm > 160 && bpm <= 200) { speedText = "Insane Mode"};
	if (bpm > 200) { speedText = "Hell Mode"};
	tempoText.textContent = speedText;
}

function validateTempo(){
	// is good to throw and error instead of returning
	if (bpm<=40) { return };
	if (bpm>=280) { return };
}

function clickPlay(){
	if(counter === beats) { counter = 0; }
	if(counter === 0) {
		accentClick.play();
		accentClick.currentTime = 0;
	}
	else { 
		beatClick.play(); 
		beatClick.currentTime = 0;
	}
	counter++;
}

const metronome = new Timer(clickPlay, 60000/bpm, { immediate: true} );


