const express = require("express");
const router = express.Router();

const Vehicle = require("../models/Vehicle");
const Owner = require("../models/Owner");

router.get("/", async (req, res) => {
  const vehicles = await Vehicle.findAll({
    include: {
      model: Owner,
      attributes: ["name"],
    },
  });

  res.status(200).json(vehicles ?? []);
});

router.post("/", async (req, res) => {
  const { plate, year, monthly_fee, fk_owner } = req.body;

  try {
    const newVehicle = await Vehicle.create({
      plate,
      year,
      monthly_fee,
      fk_owner,
    });

    res.status(200).json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "BAD_REQUEST" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const vehicle = await Vehicle.findByPk(id);
    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Vehicle.destroy({
      where: {
        vehicle_id: id,
      },
    });

    res.status(200).json({ message: "Deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { plate, year, monthly_fee, fk_owner } = req.body;

    await Vehicle.update(
      {
        plate,
        year,
        monthly_fee,
        fk_owner,
      },
      {
        where: { vehicle_id: id },
      },
    );

    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
