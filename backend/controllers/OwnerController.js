const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner");

router.get("/", async (req, res) => {
  const owners = await Owner.findAll();
  res.status(200).json(owners ?? []);
});

router.get("/list", async (req, res) => {
  const owners = await Owner.findAll({
    attributes: ["owner_id", "name"],
  });
  res.status(200).json(owners ?? []);
});

router.post("/", async (req, res) => {
  try {
    const { name, cpf } = req.body;
    console.log(name, cpf);
    const newOwner = await Owner.create({ name, cpf });
    res.status(201).json({ message: "Cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owner.findByPk(id);
    res.status(200).json(owner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Owner.destroy({
      where: {
        owner_id: id,
      },
    });
    res.status(200).json({ message: "Excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, cpf } = req.body;

    console.log(">>", { name, cpf, id });

    await Owner.update(
      { name, cpf },
      {
        where: { owner_id: id },
      },
    );
    res.status(200).json({ message: "Atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
