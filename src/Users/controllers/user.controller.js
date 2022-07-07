// @ts-nocheck
const { User,Role,Notification } = require("../../../models");
const jwt = require("jsonwebtoken");
const emitter = require("../../utils/Emitter");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAndCountAll();

    res.status(200).json({
      status: req.t('success status'),
      result: users.length,
      data: {
        users: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error.stack,
    });
  }
};

const getUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: ["role"],
    });
    res.status(200).json({
      status: req.t("success message"),
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    });
  }
};

const changeRole = async (req, res) => {
  const uuid = req.params.uuid;
  const { roleName } = req.body;
  const role = await Role.findOne({where: {roleName}})

  if(!role){
    res.status(404).json({
      message: req.t("Role does not exists"),
    });
  }
  else{
    try {
      const user = await User.findOne({ where: { uuid } });
      if(user.roleName == roleName){
        res.status(403).json({
          message: req.t(`The user is already an ${roleName}`),
        });
      } 
      else{   
        const notificationBody = {
          title:"Role change",
          content:`Hey ${user.name} your role has been changed from ${user.roleName} to ${role.roleName}.Your role now is ${role.roleName}`
        };
        user.roleName = role.roleName;
        user.roleId = role.id;
        await user.save();
        const notification = await Notification.create({
          title:notificationBody.title,
          content:notificationBody.content,
          receiver:user.uuid
        });

        emitter.emit("notification request", "");

        res.status(200).json({
          status: req.t("success status"),
          message: req.t("user role updated message"),
          data: {
            user,
            notification,
          },
        });
      }
    } catch (error) {
      res.status(404).json({
        message: req.t("user wrong ID"),
        Error: error.message,
      });
    }
  }
};

const allNotifications = async(req,res)=>{
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const uuid = decoded.uuid;
  try {
    const user = await User.findOne({where: {uuid:uuid} })
    if(!user){
      return res.status(404).json({
        message:"No user with that ID found"
      });
    }
    const notifications = await Notification.findAndCountAll({where:{receiver:uuid},order: [['createdAt', 'DESC']]});
    res.status(200).json({
      status: req.t('success status'),
      count: notifications.length,
      data: {
        notifications: notifications,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error.stack,
    });
  }
}


const readNotification = async(req,res)=>{
  const notificationId = req.params.uuid;

  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const userId = decoded.uuid;
  
  try {
    const notification = await Notification.findOne({where:{receiver:userId,uuid:notificationId}});
    if (!notification) {
      return res.status(404).json({
        message:"Notification not found"
      });
    }
    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      status: req.t('success status'),
      data: {
        notification: notification,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error.stack,
    });
  }
}

const deleteNotification = async(req,res)=>{
  const notificationId = req.params.uuid;

  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const userId = decoded.uuid;
  
  try {
    const notification = await Notification.findOne({where:{receiver:userId,uuid:notificationId}});
    if (!notification) {
      return res.status(404).json({
        message:"Notification not found"
      });
    }

    await notification.destroy();

    res.status(200).json({
      status: req.t('success status'),
      message:"Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: req.t("fail status"),
      message: req.t("try again message"),
      err: error.stack,
    });
  }
}

const updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  const {name,  profilePicture,idNumber,district,sector,cell,gender,email,permitId,telNumber,carplate,capacity,vehicletype,
  } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });

    user.name = name;
    user.profilePicture  = profilePicture;
    user.idNumber = idNumber;
    user.district = district;
    user.sector = sector;
    user.cell = cell;
    user.email = email;
    user.gender = gender;
    user.permitId = permitId;
    user.telNumber = telNumber;
    user.carplate = carplate;
    user.capacity = capacity;
    user.vehicletype = vehicletype;
    await user.save();

    res.status(200).json({
      status: req.t("success status"),
      message: req.t("user update message"),
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: req.t("user wrong ID"),
      Error: error.stack,
    });
  }
};

const updateProfile = async (req, res,next) => {
  try {
    const { uuid } = req.params;
    const {name,  profilePicture,idNumber,district,sector,cell,gender,email,permitId,telNumber,carplate,capacity,vehicletype,
    } = req.body;
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return res.status(404).json({message: "User Not Found"});
    }
    if (req.files) {
      const imageURIs = []; 
      const files = req.files; 
      for (const file of files) {
          const { path } = file;
          imageURIs.push(path);
      };
      console.log(imageURIs)
      user.profilePicture  = imageURIs;
      await user.save();
    

     
      return res.status(201).json({ user });
      
      }

      if (req.file && req.file.path) {
          const imageURIs = [];
          imageURIs.push(req.file.path);
          user.profilePicture = imageURIs; // add the single  
          await user.save();
          return res.status(201).json({ user });
      };
      if(!req.file && !req.files){
        return res.status(403).json({ message:"upload a file" });
      }
   
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "There was an error while updating",
      error: error.stack,
    });
  }
};

const deleteUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    await user.destroy();

    res.status(200).json({
      status: req.t("success status"),
      message: req.t("user deleted message"),
    });
  } catch (error) {
    res.status(404).json({
      message: req.t("user wrong ID"),
      Error: error.stack,
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  changeRole,
  allNotifications,
  deleteUser,
  readNotification,
  deleteNotification
};
