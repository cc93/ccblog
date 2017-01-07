var express = require('express');
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('userlist', {title: '科幻世界'});
    });
    app.use('/user', require('./user'));
    app.use('/signup', require('./signup'));
    app.use('/signin', require('./signin'));
    app.use('/signout', require('./signout'));
    app.use('/posts', require('./posts'));
    //dupont
    //部署前端文件的几种路由方式比较
    //前提：1.前端打包的项目文件放在主机后端项目根目录下的public目录，并且public目录设置为静态文件目录（客户端可以直接访问），见app.js    2.html文件采用相对路径方式引用css，js，img等静态文件（如 href=',/css/base.css'）
    //路由方式一（不好）：响应一个html文件；缺点：当前目录仍然为主机域名的根目录gladcc.com/，所以html文件无法引用到项目根目录dupont下的css，js文件
    app.get('/dupont1', function (req, res) {
        //sendFile(必须为绝对路径或者指定虚拟根目录，但是此根目录只是给后端nodejs用来找指定文件的，对于前端静态文件html来说没有任何价值，它不是html的当前目录，html的当前目录仍然为主机域名的根目录gladcc.com/)
        // __dirname返回当前执行脚本所在目录的绝对路径
        res.sendFile('index.html', {root: __dirname + '/../public/dupont/'});
    });
    //路由方式二（不太好）：重定向到静态文件目录，链接成功后浏览器地址栏会发生变化，用户体验不好，本来我是输入这个地址的，敲回车后怎么又变了一个地址呢
    app.get('/dupont2', function (req, res) {
        res.redirect('/public/dupont');
    });
    //路由方式三（好）：app.use(path, 中间件) 使用中间件，建立客户端访问地址和相应的主机静态文件目录的映射关系，这样发送到客户端的html文件的当前目录指向的就是主机的静态文件目录，也就是客户端通过此链接访问到了服务器主机的局部内容（静态资源目录下的所有内容）。 如： gladcc.com/dupont3 加载的是 __dirname + '/../public/dupont/index.ejs'    gladcc.com/dupont3/css/base.css 加载的是 __dirname + '/../public/dupont/css/base.css'
    app.use('/dupont3', express.static(__dirname + '/../public/dupont/'));

    //newborn
    app.use('/newborn', express.static(__dirname + '/../public/newborn/'));


};
