const Ticket = require("../models/Ticket");

// GET all tickets
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tickets",
            error: error.message
        });
    }
};

// CREATE ticket
const createTicket = async (req, res) => {
    try {
        const { title, description, category, priority } = req.body;

        if (!title || !description || !category || !priority) {
            return res.status(400).json({
                message: "All ticket fields are required"
            });
        }

        const ticket = await Ticket.create({
            title,
            description,
            category,
            priority
        });

        res.status(201).json({
            message: "Ticket created successfully",
            ticket
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create ticket",
            error: error.message
        });
    }
};

// UPDATE ticket
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        res.status(200).json({
            message: "Ticket updated successfully",
            ticket
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update ticket",
            error: error.message
        });
    }
};

// DELETE ticket
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            });
        }

        res.status(200).json({
            message: "Ticket deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete ticket",
            error: error.message
        });
    }
};

module.exports = {
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket
};