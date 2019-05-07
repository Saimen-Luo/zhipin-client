import io from 'socket.io-client'

// 连接socket.io服务器，返回一个连接对象
const socket = io('ws://localhost:4000')

// 客户端向服务端发送消息，事件名称是sendMsg(可任意)，数据是一个对象(也可是任意)
socket.emit('sendMsg', { name: 'abc' })
console.log('客户端向服务端发送消息', { name: 'abc' })
socket.on('receiveMsg', function (data) {
    console.log('客户端收到服务端发送的消息', data)
})