import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,   
    },
    department: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    leaveBalance: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;