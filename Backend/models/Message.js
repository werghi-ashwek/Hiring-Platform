const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
      content: {
        type: String,
      },
    },
    { timestamps: true }
  );
  
  const Message = mongoose.model("Message", MessageSchema);
  
  module.exports = Message;