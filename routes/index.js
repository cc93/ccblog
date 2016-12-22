module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/posts');
    });
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    app.use('/users', require('./users'));
    app.get('/dupont', function (req, res) {
        //sendFile(必须为绝对路径或者指定根目录), __dirname返回当前执行脚本所在目录的绝对路径
        res.sendFile('./public/dupont/index.html', {root: __dirname + '/../'});
    });
    app.get('/newborn', function (req, res) {
        res.sendFile('./public/newborn/index.html', {root: __dirname + '/../'});
    });
};
