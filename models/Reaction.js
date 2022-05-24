const { Schema, model } = require("mongoose");


const reactionSchema = new Schema({
	reactionId: {
		type: String,
		required: false,
		
	},
	reactionBody: {
		type: String,
        required: true,
        max_length: 280,
		
	},
	username: {
        type: String,
        required: true,
    },
    createdAt:[
        {
            type:Date,
            // get: timestamp => dateFormat(timestamp),
            default: Date.now()
        }
    ]
},
{
    toJson:{
        virtuals: true,
    },
    id:false,
}
)

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;