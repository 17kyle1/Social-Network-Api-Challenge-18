const {Schema, model} = require('mongoose');
const moment = require('moment')
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
           type: Date,
           default: Date.now(),
           get: (currentDate) => moment(currentDate).toDate(),

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
},
{
    toJSON: {
        getters: true
    },
}
);
thoughtSchema
.virtual('reactionCount')
.get(function(){
    return this.reactions.length
})
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;