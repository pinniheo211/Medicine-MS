// const express = require("express");
// const cors = require("cors");
import express from "express";
require("dotenv").config();
// const initRoutes = require("./src/routes");
import initRoutes from "./src/routes";
import cors from "cors";
require("./connection_database");
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//CURD

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log("SERVER is running  on port" + listener.address().port);
});
