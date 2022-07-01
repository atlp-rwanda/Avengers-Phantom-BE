const bcrypt = require("bcryptjs");

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Users", [
      {
        id: "9e3d2a6c-5484-4d86-8eb0-40098cd7a541",
        name: "Admin",
        gender: "male",
        idNumber: 123456789,
        district: "Nyarugenge",
        sector: "Nyarugenge",
        cell: "Nyarugenge",
        email: "avengersphantom7@gmail.com",
        password: await bcrypt.hash("phantom123", 12),
        telNumber: 48608361,
        RoleId: "9e3d2a6c-5484-4d86-8eb0-40098cd7a540",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8e3d2a6c-5484-4d86-8eb0-40098cd7a530",
        name: "Driver",
        gender: "male",
        idNumber: 1234567890,
        district: "Nyarugenge",
        sector: "Nyarugenge",
        cell: "Nyarugenge",
        email: "driver@gmail.com",
        permitId: "123456",
        password: await bcrypt.hash("operator123", 12),
        telNumber: 48608362,
        RoleId: "9e3d2a6c-5484-4d86-8eb0-40098cd7a897",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8e3d2a6c-5484-4d86-8eb0-40198cd7a530",
        name: "Operator",
        gender: "male",
        idNumber: 1234567891,
        district: "Nyarugenge",
        sector: "Nyarugenge",
        cell: "Nyarugenge",
        email: "operator@gmail.com",
        password: await bcrypt.hash("operator123", 12),
        telNumber: 48608363,
        RoleId: "9e3d2a6c-5484-4d86-8eb0-40098cd7a534",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Users", null, {});
  },
};
