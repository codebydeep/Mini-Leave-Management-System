import { Router } from "express";
import { applyLeave, approveLeave, rejectLeave } from "../controllers/leave.controllers.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply-leave/:id", applyLeave);
leaveRoutes.post("/approve-leave/:id", approveLeave);
leaveRoutes.post("/reject-leave/:id", rejectLeave);

export default leaveRoutes;