function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.code}"]`);
    const drumClick = document.querySelector(`.drum-button[data-key="${e.code}"]`);
    if (!audio)
        return; //stop the function from running all together
    audio.currentTime = 0; //return to the start
    audio.play();
    drumClick.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform')
        return; //skip it if it's not a transform
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.drum-button');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);