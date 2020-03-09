let socket = io()

let username = $('#username'),
    message = $('#message'),
    btn = $('#send'),
    output = $('#output'),
    feedback = $('#feedback')
btn.click(() => {
    socket.emit('chat', {
        message: message.val(),
        username: username.val()
    })
    message.val('')
    message.focus()
})

let timer = null
message.keydown(() => {
    clearTimeout(timer)
    socket.emit('typing', username.val())
    timer = setTimeout(() => {
        socket.emit('not-typing')
    }, 1000);
})

username.keydown(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
        socket.emit('user-login', username.val())
    }, 1500);
})

socket.on('chat', (data) => {
    let htmlString = `<p><strong>${data.username}: </strong>${data.message}</p>`
    console.log(htmlString)
    output.append(htmlString)
    feedback.html('')
})

socket.on('typing', (data) => {
    let htmlString = `<p><em>${data} is typing...</em></p>`
    feedback.html(htmlString)
})

socket.on('not-typing', () => {
    feedback.html('')
})

socket.on('user-login', (data) => {
    let htmlString = `<p><em>${data} is online.</em></p>`
    output.append(htmlString)
})