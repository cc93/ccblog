/**
 * Created by congcong on 2017/1/7.
 */
module.exports = {
    signinRequired: function (req, res, next) {
        var user = req.session.user
        if (!user) {
            return res.render('redirect',{
                title:'重定向',
                message:'请先登录！',
                targetTitle:'登录',
                targetHref:'/signin'
            })
        }
        next()
    },

    adminRequired: function (req, res, next) {
        var user = req.session.user
        if (user.role < 100) {
            return res.render('redirect',{
                title:'重定向',
                message:'您不是管理员，无法访问此页面！',
                targetTitle:'登录',
                targetHref:'/signin'
            })
        }
        next()
    },
}