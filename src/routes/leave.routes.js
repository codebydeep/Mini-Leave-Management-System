import { Router } from "express";
import { applyLeave, approveLeave, rejectLeave } from "../controllers/leave.controllers.js";

const leaveRoutes = Router();

leaveRoutes.post("/apply-leave/:id", applyLeave);
leaveRoutes.patch("/approve-leave/:id", approveLeave);
leaveRoutes.patch("/reject-leave/:id", rejectLeave);

export default leaveRoutes;