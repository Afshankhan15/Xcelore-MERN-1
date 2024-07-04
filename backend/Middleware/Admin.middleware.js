exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'Admin') 
      {
        console.log("User role : ",req.user.role)
        return res.status(403).json({ message: 'Access denied.' });
      }
      
    next();
  };