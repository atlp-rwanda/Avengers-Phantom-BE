const bcrypt = require("bcryptjs");

("use strict");

module.exports = {
  up:async (queryInterface, Sequelize)=>{
    return await queryInterface.bulkInsert(
      "users",
      [
      
        {
          uuid: "9e3d2a6c-5484-4d86-8eb0-40098cd7a540",
          name: "avengers",
          profilePicture: "https://res.cloudinary.com/avengersimages/image/upload/v1655617940/phantomImages/default-avatar_zkiotb.png",
          gender: "male",
          idNumber: 123456789,
          district: "Nyarugenge",
          sector: "Nyarugenge",
          cell: "Nyarugenge",
          email: "avengersphantom7@gmail.com",
          password: await bcrypt.hash("phantom123", 12),
          telNumber: 784860836,
          roleName: "administrator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: "8e3d2a6c-5484-4d86-8eb0-40098cd7a530",
          name: "avengers",
          profilePicture: "https://res.cloudinary.com/avengersimages/image/upload/v1655617940/phantomImages/default-avatar_zkiotb.png",
          gender: "male",
          idNumber: 123456789,
          district: "Nyarugenge",
          sector: "Nyarugenge",
          cell: "Nyarugenge",
          email: "avengersphantom70@gmail.com",
          password: await bcrypt.hash("operator123", 12),
          telNumber: 784860836,
          roleName: "operator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
