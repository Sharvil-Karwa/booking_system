require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ticketRoutes = require("./ticketRoutes");
const app = express();
const cors = require("cors");
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://12345:${process.env.PASSWORD}@cluster0.mog0tlz.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    app.use(express.json());
    app.get("/", (req, res) => {
      res.send(
        "/api/available - GET all tickets, /api/details/:number - GET ticket details, /api/bookTicket - POST book ticket, /api/create - create 500 tickets."
      );
    });
    app.use("/api", cors(), ticketRoutes);
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server has started!");
    });
  });
