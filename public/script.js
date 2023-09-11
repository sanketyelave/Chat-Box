const socket = io();

const form = document.getElementById('send-container')
const messageInput = document.getElementById('msgInp')
const messageContainer = document.getElementById('container')
const information = document.getElementById('info')
const dembo = document.getElementById('dembo')

//For sound to seek more user's attention
function playMessageSound() {
    const audio = document.getElementById('message-sound');
    audio.play();
    setTimeout(function () {
        if (!audio.paused) {
            audio.pause();
        }
    }, 1000);
}
function playMessage() {
    const audio = document.getElementById('messageS');
    audio.play();
    setTimeout(function () {
        if (!audio.paused) {
            audio.pause();
        }
    }, 1000);
}
function playSound() {
    const audio = document.getElementById('sound');
    audio.play();
    setTimeout(function () {
        if (!audio.paused) {
            audio.pause();
        }
    }, 1000);
}




form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (messageInput.value.trim() === '') {
        alert('Message should not be emptym 🫗')
    } else {
        append(`${message}`, 'right');
        socket.emit('send', message);
        playMessageSound();
    }
    messageInput.value = ''
    // audioPlayer.play();
})

const name = prompt('Whats your name')
socket.emit('New-user-joined', name)

const append = (message, position) => {
    const create = document.createElement('div')
    create.innerHTML = message;
    create.classList.add('msg');
    create.classList.add(position);
    messageContainer.appendChild(create)

}
const center = (message, position) => {
    const create = document.createElement('div')
    create.innerHTML = message;
    create.classList.add('mid');
    create.classList.add(position);
    messageContainer.appendChild(create)

}

socket.on('user-joined', name => {
    center(`🟢 ${name} joined the room`, 'center')
    
})

socket.on('receive', data => {
    append(`${data.users}:${data.message}`, 'left')
})
socket.on('user-joined', name => {
    center(`❌ ${name} left the room`, 'center')
    
})

// const join = (message, position) => {
//     const create = document.createElement('div')
//     create.innerHTML = message;
//     dembo.classList.remove('hide');
//     create.classList.add(position);
//     information.appendChild(create)

// }
// const left = (message, position) => {
//     const create = document.createElement('div')
//     create.innerHTML = message;
//     dembo.classList.add('hide');
//     create.classList.add(position);
//     information.appendChild(create)

// }
// const videoPlayer = document.getElementById('videoPlayer');

// const cam = document.getElementById('camera')
// var camera = () => {
//     cam.classList.remove('open');
//     cl.classList.add('open');
//     console.log('hello')
// }

// const uplode = document.getElementById('imageUploadForm');
// const Fuplode = document.getElementById('fileInput');
// uplode.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const file = Fuplode.files[0];
//     if (file) {
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const imageData = event.target.result;
//             socket.emit('image', imageData);
//         };

//         reader.readAsBinaryString(file);
//     }
// });

// const cl = document.getElementById('close')
// const debo = () => {
//     cl.classList.remove('open');
//     cam.classList.add('open');
//     console.log('clicked')
// }
