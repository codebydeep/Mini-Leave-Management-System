import { Router } from "express";
import { addEmployee } from "../controllers/employee.controllers.js";

const employeeRoutes = Router();

employeeRoutes.post("/add-employee", addEmployee);

export default employeeRoutes;