let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let lapCount = 0;

const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateTime() {
  updatedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(updatedTime);
}

startPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    startTime = Date.now() - (updatedTime || 0);
    timerInterval = setInterval(updateTime, 10);
  } else {
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    clearInterval(timerInterval);
  }
});

resetBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timerInterval);
  updatedTime = 0;
  timerDisplay.textContent = '00:00:00';
  startPauseBtn.textContent = 'Start';
  lapsList.innerHTML = '';
  lapCount = 0;
});

lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const li = document.createElement('li');
    lapCount += 1;
    li.textContent = `Lap ${lapCount}: ${formatTime(updatedTime)}`;
    lapsList.appendChild(li);
  }
});
