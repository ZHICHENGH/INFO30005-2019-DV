var mongoose = require('mongoose');
var  User= mongoose.model('user');

var createuser = function(req,res){
    var user = new User({
        "user_id":req.body.user_id,
        "name":req.body.name,
        "passport":req.body.passport,
        "email":req.body.email
    });
    user.save(function(err,newUser){
        if(!err){
            res.send(newUser);
        }else{
            res.sendStatus(400);
        }
    });
};
var findAllusers = function(req,res){
    User.find(function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};
var findOneuser = function(req,res){
    var userInx = req.params.id;
    User.find({user_id:userInx},function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};
var finduserByName = function(req, res){
    var Name = req.params.Name;
    User.find({userName:Name},function(err,user){
        if(!err){
            res.send(userName);
        }else{
            res.sendStatus(404);
        }
    });
};
var deleteuserById =function(req, res){
    var userInx = req.params.id;
    User.findOneAndDelete({"user_id":userInx}, function(req,res){
        if(!err){
            res.send(userInx);
        }
        else
        res.send("fail to delete");
    });
};


module.exports.createuser = createuser;
module.exports.findAllusers = findAllusers;
module.exports.findOneuser = findOneuser;
module.exports.finduserByName = finduserByName;
module.exports.deleteuserById = deleteuserById;