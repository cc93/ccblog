/**
 * Created by congcong on 2017/1/16.
 */
var mongoose = require('mongoose');

//Create the model schema
var CounterSchema = new mongoose.Schema({
    name: String,
    sequence: Number
});

CounterSchema.statics = {
    getNextSequence: function (name) {
        this.findOneAndUpdate({name: name}, {$inc: {sequence: 1}}, {new: true},function(err,doc){
            if(err) console.error(err);
            var seq = doc.sequence;
            console.log(seq);
            return doc
        })
        return seq
    }
}

var Counter = mongoose.model('Counter', CounterSchema);
Counter.create({
    name: 'movieid',
    sequence: 0
})
module.exports = Counter;
