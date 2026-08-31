const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            enum: ["Hardware", "Software", "Network", "Access", "Other"]
        },

        priority: {
            type: String,
            required: true,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium"
        },

        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            default: "Open"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Ticket", ticketSchema);