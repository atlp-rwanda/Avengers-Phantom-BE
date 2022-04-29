const {Bus} = require("./../../../models")

const createBus = async(req,res)=>{
    try {
        const {company,type,plateNumber,manufacturer,capacity,YOM} = req.body
        
        const newBus = await Bus.create({ company,type,plateNumber,manufacturer,capacity,YOM})
        res.status(201).json({
            status:req.t('success status'),
            message:req.t("successful creation"),
            data:{
                buses:newBus
            }
        })
    
    } catch (error) {
        res.status(400).json({
            status:req.t("fail status"),
            message:req.t('try again message'),
            err:error.stack
        })
    }
}

const getAllBuses = async(req,res)=>{
    try {
        const buses = await Bus.findAll();
        res.status(200).json({
            status:req.t('success status'),
            data:{
                buses
            }
        })
    } catch (error) {
        res.status(500).json({
            status:req.t('fail status'),
            message:req.t('try again message'),
            err:error.stack
        })
    }
}

const getBus = async(req,res)=>{
    try {
        const uuid = req.params.uuid;

        const bus = await Bus.findOne({where:{uuid}})
        res.status(200).json({
            status:req.t('success status'),
            data:{
                buses:bus
            }
        })
    } catch (error) {
        res.status(404).json({
            status:req.t('fail status'),
            message:req.t('bus wrong ID'),
            err:error.stack
        })
        
    }
}

const updateBus = async(req,res)=>{
    const {company,type,plateNumber,manufacturer,capacity,YOM} = req.body
        
    const uuid = req.params.uuid;
 
    try {
       

        const bus = await Bus.findOne({
            where:{uuid}
        })
        bus.company= company;
        bus.type= type;
        bus.plateNumber= plateNumber;
        bus.manufacturer= manufacturer;
        bus.capacity= capacity;
        bus.YOM= YOM;

        await bus.save()
        res.status(200).json({
            status:req.t('success status'),
            message:req.t('bus update success')
        })
    } catch (error) {
        res.status(404).json({
            status:req.t('fail staus'),
            message:req.t('bus wrong ID'),
            err:error.stack
        });
    }
}

const deleteBus = async(req,res)=>{
    const uuid = req.params.uuid;
    try {
        const bus = await Bus.findOne({
        where: {uuid: uuid}
        })
        await bus.destroy();
        res.status(200).json({
            message:req.t('bus delete success')
        })
    } catch (error) {
        res.status(404).json({
            status:req.t('fail status'),
            message:req.t('bus wrong ID'),
            err:error.stack
        })
    }
}

module.exports = {createBus,getAllBuses,getBus,updateBus,deleteBus}