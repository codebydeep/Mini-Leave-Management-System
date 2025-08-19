import dotenv from "dotenv";

import app from "./app.js";
import dbConnect from "./database/dbConnect.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3000;

dbConnect()
.then( () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch(error => {
    console.log(`Error Connecting Database`, error);
    process.exit(1);
})