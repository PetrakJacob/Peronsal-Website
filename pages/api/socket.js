import { Server } from 'Socket.IO'
import mongoose from 'mongoose'
import Sticky from "../../model/Sticky.js";


const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    const connectDB = async () => {
      mongoose.connect("youPutthemongodbconnectionstringhere", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }) 
    } 
    connectDB()
    
    io.on('connection', socket => {
      (async () => {
        let stickiesFromDB = await Sticky.find().lean();
        socket.emit('resPreloadStickies', JSON.stringify(stickiesFromDB))
      })();
      socket.on('create-sticky', async JsonObject => {
        let xyArr = JSON.parse(JsonObject)
        let newStickyDB = await Sticky.create({
          c: 3,
          t: "type some text",
          T: "Title",
          x: xyArr[0],
          y: xyArr[1],
          w: 350,
          h: 350
        });
        socket.emit('resProperId', newStickyDB._id.toString());
        let newStickyObj = {x: xyArr[0], y: xyArr[1], _id: newStickyDB._id.toString()}
        socket.broadcast.emit('resCreate-sticky', JSON.stringify(newStickyObj))
      });
      socket.on('deleteById', async id => {
        socket.broadcast.emit('resDeleteById', id);
        await Sticky.deleteOne({ _id: JSON.parse(id) })
      })
      socket.on('updateVal', async jsonUpdArr => {
        let updArr = JSON.parse(jsonUpdArr);
        let stickynote = await Sticky.findOne({_id: updArr[0][0]})
        updArr.map(el => {
          stickynote[el[1]] = el[2];
        })
        await stickynote.save();
        socket.broadcast.emit('resUpdateVal', jsonUpdArr)
      })
      
    })
  }
  res.end()
}

export default SocketHandler