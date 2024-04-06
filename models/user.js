const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    stories: {
        contributions: [
            {
                storyID: {type: Schema.Types.ObjectId, required: true},
                storypartNumber: {type: Number, required: true},
                story: {type: String, required:true}
            }
        ]
    }
});

module.exports = mongoose.model('User', userSchema);