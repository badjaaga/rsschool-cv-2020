// DOM Elements
const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');

// Show Time
function showTime() {

    let today = new Date();
    let options;
    options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    time.innerHTML = today.toLocaleString("en-US", options);

    setTimeout(showTime, 1000);
}

// Set Background and Greeting
function setBgGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12) {
        // Morning
        changeBackgroundImage('morning.jpg', 'Morning');

    } else if (hour < 18) {
        // Afternoon
        changeBackgroundImage('afternoon.jpg', 'Afternoon');
    } else {
        // Evening
        changeBackgroundImage('evening.jpg', 'Evening');
        document.body.style.color = 'white';
    }
}

//change background
function changeBackgroundImage(imgName, partOfDay) {
    document.body.style.backgroundImage = `url('assets/img/${imgName}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100%'
    greeting.textContent = `Good ${partOfDay}, `;
}

// Get Name
function getLocalStorageValueByElement(elementId) {
    document.getElementById(elementId).textContent = localStorage.getItem(elementId) === null ? `[Enter ${elementId}]` : localStorage.getItem(elementId);
}

function setLocalStorageValueByElement(elementId, e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.key === 'Enter') {
            localStorage.setItem(elementId, e.target.innerText);
            document.getElementById(elementId).blur();
        }
    } else {
        localStorage.setItem(elementId, e.target.innerText);
    }
}

name.addEventListener('keypress', (e) => setLocalStorageValueByElement('name', e));
name.addEventListener('blur', (e) => setLocalStorageValueByElement('name', e));
focus.addEventListener('keypress', (e) => setLocalStorageValueByElement('focus', e));
focus.addEventListener('blur', (e) => setLocalStorageValueByElement('focus', e));

// Run
showTime();
setBgGreet();
getLocalStorageValueByElement('name');
getLocalStorageValueByElement('focus');