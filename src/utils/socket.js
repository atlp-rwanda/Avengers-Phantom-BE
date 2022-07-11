const socketIO = require('socket.io')({
    cors:{
        origin:"*",
    }
})
const jwt = require("jsonwebtoken");
const {Notification} = require('../../models')
const emitter = require('./Emitter')

const tokenVerification = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRETE);
}
const getNotifications = async (user) =>{
    return Notification.findAll({where:{receiver: user,isRead:false}});
}
const socketMethod = {};
socketMethod.socketStarter = server =>{
    socketIO.attach(server);
    socketIO.on("connection", async (socket) => {
        emitter.on("notification request", async () => {
            const token = socket.handshake.auth.token
            console.log(token)
            const verifyToken = tokenVerification(token);
            const userInfo = await getNotifications(verifyToken.uuid);
            socket.emit('Notification',userInfo);
        });
        socket.on('START_ENGINE', (busData) =>{
            socket.broadcast.emit('START_ENGINE', busData)
        }) 
        socket.on('MOVE_BUS', (busData) =>{
            socket.broadcast.emit('MOVE_BUS', busData)
        }) 
        socket.on('SLOWING_BUS', (busData) =>{
            socket.broadcast.emit('SLOWING_BUS', busData)
        }) 
        socket.on('ACCELERATE_BUS', (busData) =>{
            socket.broadcast.emit('ACCELERATE_BUS', busData)
        }) 
        socket.on('PAUSE_BUS', (busData) =>{
            socket.broadcast.emit('PAUSE_BUS', busData)
        }) 
        socket.on('RESUME_BUS', (busData) =>{
            socket.broadcast.emit('RESUME_BUS', busData)
        }) 
        socket.on('ADD_PASSENGER', (busData) =>{
            socket.broadcast.emit('ADD_PASSENGER', busData)
        }) 
        socket.on('REMOVE_PASSENGER', (busData) =>{
            socket.broadcast.emit('REMOVE_PASSENGER', busData)
        }) 
    });
};
module.exports = {socketMethod,socketIO}