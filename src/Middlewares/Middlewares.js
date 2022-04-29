const { User, Roles } = require("./../../models");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const protect = async (req, res, next) => {
  try {
    let token;

    // Get token and Check if is there.

    if (req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // console.log(token)

    if (!token) {
      return res.status(401).json({
        message: req.t('middleware protect message'),
      });
    }

    //  Token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
    console.log(decoded);

    // Check if User exist

    const uuid = decoded.uuid;
    console.log(uuid);

    const freshUser = await User.findOne({
      where: { uuid: decoded.uuid },
    });

    if (!freshUser) {
      return res.status(401).json({
        message: req.t('middleware not fresh user'),
      });
    }

    req.user = freshUser;

    next();
  } catch (error) {
    res.status(401).json({
      message: req.t('try again message'),
      err: error.message,
    });
    console.log(error);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: req.t('middleware restrict message'),
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };
