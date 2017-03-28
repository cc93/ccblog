/**
 * Created by congcong on 2017/1/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('live',{title:'live'})
});


module.exports = router;