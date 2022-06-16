const bcrypt = require("bcryptjs");

("use strict");

module.exports = {
  up:async (queryInterface, Sequelize)=>{
    return await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: "9e3d2a6c-5484-4d86-8eb0-40098cd7a540",
          name: "UKWITEGETSE",
          profilePicture: "https://res.cloudinary.com/avengersimages/image/upload/v1655617940/phantomImages/default-avatar_zkiotb.png",
          gender: "male",
          idNumber: 123456789,
          district: "Nyarugenge",
          sector: "Nyarugenge",
          cell: "Nyarugenge",
          email: "ukjeandedieu1@gmail.com",
          password: "qwerty123",
          telNumber: 784860836,
          role: "administrator",
          createdAt:new Date(),
          updatedAt:new Date(),
        },
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
