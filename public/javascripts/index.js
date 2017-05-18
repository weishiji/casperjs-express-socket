var socket = io.connect(window.location.origin);
socket.on('start', function (data) {
    document.body.innerHTML = data.msg;
});
