import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps: true
});

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;