'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Stops', [{
      id: '9e3d2a6c-5484-4d86-8eb0-40098cd7a640',
      name: 'Kamonyi',
      latitude: 45667,
      longitude: 12345,
      RouteId: '9e3d2a6c-5484-4d86-8eb0-40098cd7a540',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '9e3d2a6c-5484-4d86-8eb0-40098cd7a740',
      name: 'Muhanga',
      latitude: 456678,
      longitude: 123451,
      RouteId: '9e3d2a6c-5484-4d86-8eb0-40098cd7a540',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Stops', null, {});

  }
};
