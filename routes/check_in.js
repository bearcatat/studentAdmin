var express = require('express');
var router = express.Router();
var CheckIn = require('../models/CheckIn');
var checkLogin = require('../middlewares/check').checkLogin;
var has_perm = require('../middlewares/permission').has_perm;

/* GET CheckIn listing. */
router.get('/', checkLogin,function(req, res) {

  CheckIn.fetch({}, function(err, checkIns) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      res.json({status:1,json:checkIns});
    }
  })
});

//create a CheckIn
router.post('/',has_perm('发布考勤结果帖'),function(req,res) {
  CheckIn.createFromReq(req,function(err) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else {
      res.json({status:1,message:"success create a meeting"})
    }
  });
});

/* GET a CheckIn . */
router.get('/:id',checkLogin,function(req, res) {

  CheckIn.fetchOne(req.params.id, function(err, checkIn) {
    if(err){
      res.json({status:0,message:err.message})
    }
    else{
      res.json({status:1,json:checkIn});
    }
  })
});

module.exports = router;