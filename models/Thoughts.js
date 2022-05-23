const { Schema, model } = require("mongoose");


const thoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		
	},
	createdAt: {
		type: Date,
        // get:timestamp => dateFormat(timestamp),
		default: Date.now()
	},
	username: {
        type: String,
        required: true,
    },
    reactions:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
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

const Thoughts = model("Thought",thoughtSchema);

module.exports = Thoughts;