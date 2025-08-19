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

    const existingEmployee = await Employee.findOne({name, email});

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

    // await employee.save({validateBeforeSave: false});

    res.status(201).json(
        new ApiResponse(
            201,
            employee,
            "Employee added successfully!"
        )
    )
});

export { addEmployee };