'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Roles", [
      {
        id: "9e3d2a6c-5484-4d86-8eb0-40098cd7a540",
        name: "admin",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9e3d2a6c-5484-4d86-8eb0-40098cd7a897",
        name: "driver",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9e3d2a6c-5484-4d86-8eb0-40098cd7a534",
        name: "operator",
        description: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Roles", null, {})
  }
};
