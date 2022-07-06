const bcrypt = require("bcryptjs");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("users", [
      {
        uuid: "9e3d2a6c-5484-4d86-8eb0-40098cd7a540",
        name: "avengers",
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
        
        // id:100,
        uuid:"9e3d2a6c-5484-4d86-8eb0-f0098cd7a540",
        name:"Armstrong ngororano",
        gender:"male",
        idNumber:20040820,
        district:"kicukiro",
        sector:"kicukiro",
        cell:"kicukiro",
        email:"avengersphantom7l@gmail.com",
        permitId:"qwerty12",
        telNumber:"785278453",
        carplate:"RAB322",
        capacity:"10",
        vehicletype:"ritco",
        password:await bcrypt.hash("phantom123", 12),
        roleId:7,
        roleName:"operator",
        isAssigned:"false",
        passwordResetToken:"",
        createdAt:new Date(),
        updatedAt:new Date(),
    },
    
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
