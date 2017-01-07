/**
 * Created by congcong on 2016/12/23.
 */
/**
 * Created by congcong on 16/8/19.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10; //加盐强度


//Create the model schema
var UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, 'username required!']},
    password: String,
    email: String,
    //0 normal user
    //1 verified user
    //2 professional user
    //3-9
    //>=10 admin
    //>=50 super admin
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true});
UserSchema.index({username: 1}, {unique: true})


//中间件
UserSchema.pre('save', function (next) {
    var user = this
    //密码hash和加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            // Store hash in your password DB.
            user.password = hash
            next()
        });
    });
});

//静态方法
UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            // .sort('meta.updateAt')
            .exec(cb)
    },
}

//实例方法
UserSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatched) {
            if (err) return cb(err)
            //没有错误 err = null
            cb(null, isMatched)
        })
    }
}


//Create the Model
//Model -- Collection -- table
//instances of the Model -- documents in the Collection -- records in the table
var User = mongoose.model('User', UserSchema);
module.exports = User;


//var userA = {
//    id: Number,
//    name: String,
//    email: String,
//    cellphone: String
//};
//var CommentSchema = new mongoose.Schema({
//    name: {type: String, default: 'hahaha'},
//    age: {type: Number, min: 18, index: true},
//    bio: {type: String, match: /[a-z]/},
//    date: {type: Date, default: Date.now},
//    comment: String,
//    user: userA
//});


//init the collection
// var jsonData = [
//     {"id": 1, "username": "admin", "email": "admin@gladcc.com", "password": "123456", "created date": Date.now()},
// ];
//
// UserModel.remove(
//     function (err, model) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log('clear all  OK!');
//         UserModel.create(
//             jsonData,
//             function (err, docs) {
//                 if (err) {
//                     return console.error(err);
//                 }
//                 console.log('create OK! docs = ' + docs);
//             });
//     }
// );

//CRUD examples
////Insert
//CommentModel.create(
//    {name: 'LiChong', age: 23, bio: 'eager to fly', comment: 'happy every day!'},
//    function (err, commentModel) {
//        if (err) {
//            return console.error(err);
//        }
//        console.log('create OK! commentModel = ' + commentModel);
//    });
//CommentModel.create(
//    {name: 'Ma', age: 48, bio: 'a nice woman', comment: 'happy every day!'},
//    function (err, commentModel) {
//        if (err) {
//            return console.error(err);
//        }
//        console.log('create OK! commentModel = ' + commentModel);
//    });

////Retrieve
//CommentModel.find(
//    function (err, commentModels) {
//        if (err) {
//            return console.error(err);
//        }
//        console.log('find OK! all commentModels = ' + commentModels);
//    });
////Update
//CommentModel.findOneAndupdate(
//    {name:'LiChong'},
//    {$set:{age:24}},
//    function(err,commentModel){
//        console.log('update OK!');
//        findAll();
//    }
//);
//
////Delete
//CommentModel.remove(
//    function(err,commentModel){
//        if (err) {
//            return console.error(err);
//        }
//        console.log('delete OK!');
//    }
//);