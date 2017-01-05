/**
 * Created by congcong on 2016/12/21.
 */
module.exports = {
    port: 3000,
    session: {
        secret: 'ccblog',
        key: 'ccblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost/ccblog'
};