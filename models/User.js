const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  ID:{
    type: String
  },
  email:{
    type: String,
    required: true  //not sure
  },
  firstName:{
    type: String
  },
  lastName:{
    type: String
  },
  image: {
    type: String
  }
});

//Create collection and add schema
mongoose.model('users',UserSchema);
