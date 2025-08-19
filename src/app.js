import express from "express";
import cors from "cors";

import healthCheckRoutes from "./routes/health-check.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import leaveRoutes from "./routes/leave.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ 
    extended: true 
}));

// Routes - 
app.use("/api/v1", healthCheckRoutes);
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/leave", leaveRoutes);

export default app;