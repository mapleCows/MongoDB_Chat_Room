const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProfileSchema = new Schema({
  profileName: {
    type: String,
    required: true
  },
  age:{
    type: Number
  },
  email:{
    type:String
  },
  address:{
    type:String
  },
  picture:{
    type:String
  }
});
module.exports = Item = mongoose.model('profile', ProfileSchema);