'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Routes', [{
      id: '9e3d2a6c-5484-4d86-8eb0-40098cd7a540',
      name: 'Kigali-Muhanga',
      routeCode: '1012',
      start: 'Kigali',
      destination: 'Muhanga',
      distance: '300 Km',
      duration: '3hrs',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Routes', null, {});

  }
};
