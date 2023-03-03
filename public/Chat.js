const socket = io()

let message = document.getElementById('message');
let username = document.getElementById('username');
let button = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let imageButton = document.getElementById('image-button');
let imageInput = document.getElementById('image-input');

button.addEventListener('click', function () {
    socket.emit('chat:message', {
        message: message.value,
        username: username.value,
    });
});

message.addEventListener('keypress', function () {
    socket.emit('chat:typing', username.value);
})

socket.on('chat:message', function (data) {
    console.log(data)
    actions.innerHTML = '';
    output.innerHTML += 
    `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
})

imageButton.addEventListener('click', () => {
    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        socket.emit('image', e.target.result);
    };
    reader.readAsDataURL(file);
    console.log(file)
});

socket.on('image', (data) => {
    const img = document.createElement('img');
    img.src = data;
    output.appendChild(img);
});
           
socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} .....</em></p>`
})

