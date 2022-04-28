'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'users',
      [
        {
          uuid: '9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2',
          name: 'Izere',
          idNumber: 123456789,
          gender: 'male',
          district: 'Nyarugenge',
          sector: 'Nyarugenge',
          cell: 'Nyarugenge',
          email: 'Izere@gmail.com',
          permitId: 'bmw123',
          telNumber: 784860836,
          carplate: 'RAB347XZ',
          capacity: 80,
          vehicletype: 'Quostar',
          password:
            '$2a$12$G/DwAwhFBNZPoH.h6I.6zeyPW/MEdL6Af8B3pkqDKfCiicvFKBjSO',
          role: 'operator',
          createdAt: '2022-04-25T11:49:11.535Z',
          updatedAt: '2022-04-25T11:49:11.535Z'
        },
        {
          uuid: 'f3b7f03d-641b-4ebd-9296-5c942bb971b6',
          name: 'Jean De Dieu',
          idNumber: 123456789,
          gender: 'male',
          district: 'Nyarugenge',
          sector: 'Nyarugenge',
          cell: 'Nyarugenge',
          email: 'ukjeanndo@gmail.com',
          permitId: 'bmw123',
          telNumber: 784860836,
          carplate: 'RAB347XZ',
          capacity: 80,
          vehicletype: 'Quostar',
          password:
            '$2a$12$4MTF4dxwKc6Ol9S./PlywOvlaMxGCJtpCcaEAusbScNkGdZa3ykJ.',
          role: 'Administrator',
          createdAt: '2022-04-25T13:58:55.532Z',
          updatedAt: '2022-04-25T13:58:55.532Z'
        },
        {
          uuid: '0adf4c1a-ecc7-47f9-8b78-56aa4c6bb725',
          name: 'UKWITEGETSE',
          idNumber: 123456789,
          gender: 'male',
          district: 'Nyarugenge',
          sector: 'Nyarugenge',
          cell: 'Nyarugenge',
          email: 'ukjeanndo1@gmail.com',
          permitId: 'bmw123',
          telNumber: 784860836,
          carplate: 'RAB347XZ',
          capacity: 80,
          vehicletype: 'Quostar',
          password:
            '$2a$12$hPXDq0zo9xyNHjhJrFB/8e.DRav.YwxPqgfTUskV66hhsvuy.WGfu',
          role: 'Administrator',
          createdAt: '2022-04-25T14:21:22.963Z',
          updatedAt: '2022-04-25T14:21:22.963Z'
        },
        {
          uuid: 'c4c5cd90-c1fa-4252-8e91-034b65a2a7a6',
          name: 'Admin',
          idNumber: 123456789,
          district: 'Nyarugenge',
          sector: 'Nyarugenge',
          cell: 'Nyarugenge',
          gender: 'male',
          permitId: 'bmw123',
          telNumber: 784860836,
          carplate: 'RAB347XZ',
          capacity: 80,
          vehicletype: 'Quostar',
          role: 'Administrator',
          email: 'admin1@gmail.com',
          password:
            '$2a$12$UdHXJL6NiDlMt8nFMDuyvuCqWOFzedTc6QkDsdWGSiOfWGxQ0Cxju',
          updatedAt: '2022-04-28T16:56:27.118Z',
          createdAt: '2022-04-28T16:56:27.118Z'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
