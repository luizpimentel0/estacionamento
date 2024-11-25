const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8081;

const owner = require("./controllers/OwnerController");
const vehicle = require("./controllers/VehicleController");

app.use(bodyParser.json());
app.use(cors());
app.get("/", (_, req) => req.send('I"m here'));

app.use("/proprietario", owner);
app.use("/veiculos", vehicle);
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
