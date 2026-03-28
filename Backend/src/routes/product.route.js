const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const prisma = require("../prismaClient");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    console.log(req.body);

    const product = await prisma.product.create({
      data: {
        ...req.body,
        organizationId: req.user.organizationId,
      },
    });

    res.json({ message: "Product added successfully!!", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        organizationId: req.user.organizationId,
      },
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.product.delete({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId,
      },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId,
      },
      data: req.body,
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
