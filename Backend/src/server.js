import express from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js"

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});

// Error handling
const shutdown = (type)=> {
    console.log(`\n ${type} received. Closing the API`);
    server.close(() => {
        console.log("✅ Server closed. Safe flight!");
        process.exit(type === "SIGTERM" ? 0 : 1);
    });
}

// Handle unhandled promise rejection (g. database connection errors)
process.on("unhandledRejection", (err)=> {
    console.error("Unhandled rejection: ", err);
    shutdown("unhandledRejection");
});

// handle uncaught exception
process.on("uncaughtException", async (err)=> {
    console.error("Uncaught Exception: ", err);
    shutdown("uncaughtException");

});

// Gracefully shutdown
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));