const Profile = require("../models/UserProfile");

function getProfile(request, response) {
    let profileName = request.params.profileName;
    Profile.find({ profileName: profileName })
      .lean()
      .then((items) => {
        response.render("profile", {title: "profile",profileName: items,isAvailable: true,});
      });
  }

  module.exports = {
    getProfile,
  };