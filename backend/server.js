require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDatabase = require("./config/database");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Enterprise IT Platform API is running"
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
    }
};

startServer();