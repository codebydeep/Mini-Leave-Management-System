import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Leave from "../models/leave.model.js";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import Employee from "../models/employee.model.js";
dayjs.extend(customParseFormat);

const applyLeave = asyncHandler(async(req, res) => {
    const employeeId = req.params.id;

    const {
        startDate,
        endDate,
        reason
    } = req.body;

    if(!startDate || !endDate || !reason){
        throw new ApiError(
            400,
            "All fields are required!"
        )
    }

    const employee = await Employee.findById(employeeId);

    if(!employee){
        throw new ApiError(
            404,
            "Employee not found"
        )
    }

    const formatStartDate = dayjs(startDate, "DD-MM-YYYY").toDate();
    const formatEndDate = dayjs(endDate, "DD-MM-YYYY").toDate();

    const leave = await Leave.create({
        employee: employeeId,
        startDate: formatStartDate,
        endDate: formatEndDate,
        reason
    });

    await leave.save();

    const employeeData = await Leave.findById(leave._id).populate("employee", "name email department");

    res.status(200).json(
        new ApiResponse(
            200,
            employeeData,
            "Leave applied successfully"
        )
    )
});

const approveLeave = asyncHandler(async(req, res) => {
    const leaveId = req.params.id;

    const leave = await Leave.findById(leaveId).populate("employee");

    if(!leave){
        throw new ApiError(
            404,
            "Leave not found"
        )
    }

    if(leave.status === "approved"){
        throw new ApiError(
            400,
            "Leave already approved"
        )
    }

    if(leave.status === "rejected"){
        throw new ApiError(
            400,
            "Leave already rejected"
        )
    }

    const totalDays = dayjs(leave.endDate).diff(dayjs(leave.startDate), "days") + 1;

    if(leave.employee.leaveBalance < totalDays || leave.employee.leaveBalance === 0){
        throw new ApiError(
            400,
            "Leave balance is not enough || No leave Remaining this month"
        )
    }

    leave.status = "approved";

    await leave.save();

    const employee = await Employee.findById(leave.employee._id);

    employee.leaveBalance -= totalDays;
    await employee.save();

    res.status(200).json(
        new ApiResponse(
            200,
            {
                name: leave.employee.name,
                email: leave.employee.email,
                department: leave.employee.department,
                remainingLeaves: leave.employee.leaveBalance
            },
            "Leave approved successfully"
        )
    )
});

const rejectLeave = asyncHandler(async(req, res) => {
    const leaveId = req.params.id;

    const leave = await Leave.findById(leaveId);

    if(!leave){
        throw new ApiError(
            404,
            "Leave not found"
        )
    }

    if(leave.status === "approved"){
        throw new ApiError(
            400,
            "Leave already approved"
        )
    }

    if(leave.status === "rejected"){
        throw new ApiError(
            400,
            "Leave already rejected"
        )
    }

    leave.status = "rejected";
    await leave.save();

    res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Leave rejected successfully"
        )
    )
});

export { applyLeave, approveLeave, rejectLeave };