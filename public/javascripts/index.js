var socket = io.connect('http://localhost:3000');
socket.on('start', function (data) {
    document.body.innerHTML = data.msg;
});
