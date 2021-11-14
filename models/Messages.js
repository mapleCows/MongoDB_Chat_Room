const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  roomName: {
    type: String,
    required: true
  },
  username:{
    type:String,
  },
  message:{
    type:String,
    required:true,
  },
  dateOfEntry:{
    type:Date,
    default:Date.now()
  }
});
module.exports = Item = mongoose.model('message', MessageSchema);