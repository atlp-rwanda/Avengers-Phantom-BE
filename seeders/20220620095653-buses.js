
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("buses", [
      {
    
      
        uuid:"2ae55c54-1a1a-4eed-8f8e-a6c1a62e6d08",
        company:"yego cabs",
        type:"bbbbbbb",
        plateNumber:"RAB123",
        manufacturer:"yutong",
        capacity:70,
        yearOfManufacturing:"2014",
        // userId:"",
        isAssigned:"false",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
 
        uuid:"2ae55c54-1a1a-4eed-8f8e-b6c1a62e6d08",
        company:"yego cabs",
        type:"bbbbbbb",
        plateNumber:"RAB123",
        manufacturer:"yutong",
        capacity:70,
        yearOfManufacturing:"2014",
        // userId:"",
        isAssigned:"false",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
    
      
        uuid:"2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08",
        company:"yego cabs",
        type:"bbbbbbb",
        plateNumber:"RAB123",
        manufacturer:"yutong",
        capacity:70,
        yearOfManufacturing:"2014",
        // userId:"",
        isAssigned:"false",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
    
      
        uuid:"2ae55c54-1a1a-4eed-8f8e-f6c1a62e6d08",
        company:"yego cabs",
        type:"bbbbbbb",
        plateNumber:"RAB123",
        manufacturer:"yutong",
        capacity:70,
        yearOfManufacturing:"2014",
        // userId:"",
        isAssigned:"false",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
    
     
        uuid:"2ae55c54-1a1a-4eed-8f8e-e6c1a62e6d08",
        company:"yego cabs",
        type:"bbbbbbb",
        plateNumber:"RAB123",
        manufacturer:"yutong",
        capacity:70,
        yearOfManufacturing:"2014",
        userId:9,
        isAssigned:"true",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("buses", null, {});
  },
};