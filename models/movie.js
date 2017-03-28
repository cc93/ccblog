/**
 * Created by congcong on 2016/12/23.
 */
var mongoose = require('mongoose');
var request = require('superagent')
var Counter = require('./couter')

//Create the model schema
var MovieSchema = new mongoose.Schema({
    id:Number,
    title: String,
    year: String,
    directors: Array,
    casts: Array,
    rating: Number,
    images: String,
}, {timestamps: true});


//静态方法
MovieSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('updatedAt')
            .exec(cb)
    },
}

//Create the Model
//Model -- Collection -- table
//instances of the Model -- documents in the Collection -- records in the table
var Movie = mongoose.model('Movie', MovieSchema);

request
    .get('https://api.douban.com/v2/movie/in_theaters')
    .end(function (err, res) {
        if (err) return console.error(err);
        var moviesInTheaters = res.body //array
        var myMovies = []
        myMovies = moviesInTheaters.subjects.map(function (v, i, arr) {
            return {
                id:v.id,
                title: v.title,
                year: v.year,
                directors: v.directors,
                casts: v.casts,
                rating: v.rating.average,
                images: v.images.large
            }
        })
        Movie.create(myMovies, function (err, docs) {
            if (err) return console.error(err);
        })
    })


module.exports = Movie;
