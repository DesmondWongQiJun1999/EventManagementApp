const mongoose = require("mongoose")

const EventSchema = mongoose.Schema(
    {
        Title:{
            type: String,
            required: true,
        },
        Description:{
            type: String,
            required: true,
        },
        StartTime:{
            type: Date,
            required: true,
        },
        EndTime:{
            type: Date,
            required: true,
        },
        LocationLink:{
            type: String,
            required: true,
        },

    }
)

module.exports = mongoose.model("Events", EventSchema)