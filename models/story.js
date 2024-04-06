const { Schema, default: mongoose } = require("mongoose");

const storySchema = new Schema({
    owner: { 
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    storyStarting: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    contributions: [
        {
            userID: {type: Schema.Types.ObjectId, required: true},
            storypartNumber: {type: Number, required: true},
            story: {type: String, required:true}
        }
    ]
});

module.exports = mongoose.model('Story', storySchema);