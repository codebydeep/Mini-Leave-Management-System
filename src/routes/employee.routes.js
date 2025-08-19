import { Router } from "express";
import { addEmployee, getEmployee, getLeaveBalance } from "../controllers/employee.controllers.js";

const employeeRoutes = Router();

employeeRoutes.post("/add-employee", addEmployee);
employeeRoutes.get("/:id", getEmployee);
employeeRoutes.get("/leave-balance/:id", getLeaveBalance);

export default employeeRoutes;