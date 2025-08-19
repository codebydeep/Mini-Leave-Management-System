import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import Employee from "../models/employee.model.js";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat);

const addEmployee = asyncHandler(async(req, res) => {
    const {
        name,
        email,
        department,
        joiningDate,
        leaveBalance
    } = req.body;

    if(!name || !email || !department || !joiningDate || !leaveBalance){
        throw new ApiError(
            400,
            "All fields are required!"
        )
    }

    const existingEmployee = await Employee.findOne({email});

    if(existingEmployee){
        throw new ApiError(
            400,
            "Employee already exists!"
        )
    }

    const formatDate = dayjs(joiningDate, "DD-MM-YYYY").toDate();

    const employee = await Employee.create({
        name,
        email,
        department,
        joiningDate: formatDate,
        leaveBalance
    })

    res.status(201).json(
        new ApiResponse(
            201,
            employee,
            "Employee added successfully!"
        )
    )
});

const getEmployee = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const employee = await Employee.findById(id).select("-_id -createdAt -updatedAt -__v");

    if(!employee){
        throw new ApiError(
            404,
            "Employee not found"
        )
    }

    res.status(200).json(
        new ApiResponse(
            200,
            employee,
            "Employee fetched successfully"
        )
    )
});

const getLeaveBalance = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const employee = await Employee.findById(id);

    if(!employee){
        throw new ApiError(
            404,
            "Employee not found"
        )
    }

    const leaveBalance = employee.leaveBalance;

    res.status(200).json(
        new ApiResponse(
            200,
            { 
                "leaveBalance": `${leaveBalance} days`
            },
            "Leave balance fetched successfully"
        )
    )
});

export { addEmployee, getEmployee, getLeaveBalance };