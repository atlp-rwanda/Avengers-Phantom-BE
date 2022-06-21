
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("roles", [
      {
    
        id:1,
        uuid:"9e3d2a6c-5484-4d86-8eb0-a0098cd7a540",
        roleName:"driver",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("roles", null, {});
  },
};

