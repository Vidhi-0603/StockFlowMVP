const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const prisma = require("../prismaClient");

router.post("/add", authMiddleware, async (req, res) => {  
  try {
    const product = await prisma.product.create({
      data: {
        ...req.body,
        organizationId: req.user.organizationId,
      },
    });

    res.json({message:"Product added successfully!!",product});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getProducts", authMiddleware, async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      organizationId: req.user.organizationId,
    },
  });

  res.json(products);
});



module.exports = router;
