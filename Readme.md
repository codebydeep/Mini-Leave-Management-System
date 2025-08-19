# Mini-Leave-Management System

A RESTful APIs for managing Employee and leaves built with **Node.js**, **Express**, and **MongoDB** where Admin can Add a new Employee. An Employee can easily apply for a Leave & Admin can approve or reject thier Leave requests, based on their total leaveDays. 

---
## Features
- Adding a new Employee
- An Employee can apply for a leave
- Apply or Reject leave for Employee
- Fetching leave-balance for an Employee

---

## 🛠 Tech Stack

- **Backend Framework:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Error Handling:** Custom `ApiError` and `ApiResponse` classes for responses and errors.
- **DayJS:** for Date formatting and handling.
- **Deployement:** Vercel
---
## Edge-Cases Handled
- Cannot Apply for Leave before the Joining Date
- Employee not found
- Cannot apply for leave, if leave-balance is 0 days
- Cannot apply for a leave (Invalid Dates) - If End Date before Start Date
---
## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codebydeep/Mini-Leave-Management-System.git

   cd mini-leave-management-system

   ```

2. **Install all the dependencies**
   ```bash
   npm install
   ```

3. **Run the Docker command** If you want to use docker container for mongoDB
   ```bash
    docker run -d --name mongodb -p 27017:27017 mongo
   ```

4. If you not want to use Docker Image for MongoDB, you can use local Mongo URL-
   ```bash
    URL - mongodb://127.0.0.1:27017/leave-management

   ```

5. **Copy the environment variables from .env.example file**
   ```bash
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/mongodb
   BASE_URL=http://localhost:PORT
   ```

6. **Run the Server**
   ```bash
    npm run dev
   ```

## Postman Collection-

    You can test all endpoints using the following Postman Collection:
   
   👉[Mini Leave Management API – Postman Link](https://postman-api-team-5911.postman.co/workspace/My-Workspace~850edd4a-5a81-416a-85da-6fea6ae2c084/collection/43147937-6093ea50-5212-49fc-9987-1fa77fafe8f3?action=share&creator=43147937)
---

## 📌 API Endpoints


###  Health Check Route
- **Check API health and Checks If a Server is running or not**  
  `GET /api/v1/health-check`

---  

###  Employee Routes
- **Add a new Employee**  
  `POST - /api/v1/employees/add-employee`

- **Get Employee by ID**  
  `GET - /api/v1/employees/:id`

- **Get Leave Balance of an Employee**  
  `GET - /api/v1/employees/leave-balance/:id`

---

###  Leave Routes
- **Apply for Leave**  
  `POST - /api/v1/leaves/apply-leave/:id`

- **Approve Leave**  
  `PATCH - /api/v1/leaves/approve-leave/:id`

- **Reject Leave**  
  `PATCH - /api/v1/leaves/reject-leave/:id`
---
## Postman Images -

* - HealthCheck Route- Check for Server is running or not
![Health-Check](./public/images/Screenshot%202025-08-19%20210940.png)

1. Add Employee
![AddEmployee](./public/images/Screenshot%202025-08-19%20210430.png)
2. Get Employee
![GetEmployee](./public/images/Screenshot%202025-08-19%20210520.png)
3. Get Leave-Balance for Employee
![GetLeave-BaloanceforanEmployee](./public/images/Screenshot%202025-08-19%20210603.png)
4. Apply for a Leave
![ApplyforaLeave](./public/images/Screenshot%202025-08-19%20210758.png)
5. Approve Leave for Employee
![ApproveLeaveforanEmployee](./public/images/Screenshot%202025-08-19%20210832.png)
6. Reject Leave for Employee - 
If a Approved Leave request was send-
![RejectLeaveforanEmployee](./public/images/Screenshot%202025-08-19%20210918.png)
If a Pending Leave request was send-
![RejectLeaveforanEmployee](./public/images/Screenshot%202025-08-19%20212635.png)
---

## Future Improvements-

- **Redis** for caching if traffic increases, to improve performance.
- Implement an User Authentication based on Admin/Employee.
- Implement a Rate-limiting to an API Endpoints for frequent requests.
---