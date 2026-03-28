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

    res.json({message:"Product added successfully!!",product});
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



module.exports = router;
