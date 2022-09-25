const express = require("express");
const Ticket = require("./models/Ticket");
const router = express.Router();

router.get("/create", async (req, res) => {
  // create 500 tickets
  for (let i = 1; i <= 500; i++) {
    const ticket = new Ticket({
      booked: false,
      number: i,
      price: 100,
    });
    await ticket.save();
  }
  res.send("Tickets created");
});

router.get("/available", async (req, res) => {
  const tickets = await Ticket.find({ booked: false });
  res.send(tickets);
});

router.get("/details/:number", async (req, res) => {
  const ticket = await Ticket.findOne({ number: req.params.number });
  res.send(ticket);
});

router.post("/bookTicket", async (req, res) => {
  const { number, owner, ownerEmail } = req.body;
  const ticket = await Ticket.findOne({ number });
  if (ticket.booked) {
    res.send("Ticket already booked");
  } else {
    ticket.booked = true;
    ticket.owner = owner;
    ticket.ownerEmail = ownerEmail;
    await ticket.save();
    res.send("Ticket booked");
  }
});

module.exports = router;
