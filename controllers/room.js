const Messages = require("../models/Messages");
function getRoom(request, response) {
    let roomName = request.params.roomName;
    Messages.find({ roomName: roomName })
      .lean()
      .then((items) => {
        response.render("room", {title: "room",roomName,messages: items,isAvailable: true,});
      });
  }
  
  function getMessages(request, response) {
    let roomName = request.params.roomName;
    Messages.find({ roomName: roomName })
      .lean()
      .then((items) => {
        response.json(items);
      });
  }
  module.exports = {
    getRoom,
    getMessages,
  };