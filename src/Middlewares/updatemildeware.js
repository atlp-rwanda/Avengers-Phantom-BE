const protect_user = async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
  
      // console.log(token)
  
      if (!token) {
        return res.status(401).json({
          message: req.t('middleware protect message'),
        });
      }
  
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE);
      console.log(decoded);
  
      // Check if User exi
  
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
      const uuid2 = req.params.uuid;
      if(uuid!==uuid2){
        return res.status(403).json({
          message: 'you are not allowed to perfom this action',
        });
      }
      next();
    } catch (error) {
      res.status(401).json({
        message: req.t('try again message'),
        err: error.message,
      });
      console.log(error);
    }
  };