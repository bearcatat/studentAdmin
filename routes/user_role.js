var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Role = require('../models/Role');



/* update user role. */
router.put('/:user_id/:role_id', function(req, res) {
  Role.findById(req.params.role_id,function(err, role) {
    if (err||!role) {
      res.json({status:0,message:'role doesn\'t exit! ' });
    }
    else{
      User.findByIdAndUpdate(req.params.user_id,{role_id:role._id},function(err, user) {
        if (err) {
          res.json({status:0,message:err.message});
        }
        else{
          res.json({status:1,message:'success'});
        }
      });
    }
  });
});

module.exports = router;
