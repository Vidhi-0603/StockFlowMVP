const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const prisma = require("../prismaClient");

router.get("/", authMiddleware, async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      organizationId: req.user.organizationId,
    },
  });

  const totalProducts = products.length;

  const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);

  const lowStock = products.filter(
    (p) => p.quantity <= (p.lowStockThreshold || 5),
  );

  res.json({
    products,
    totalProducts,
    totalQuantity,
    lowStock,
  });
});

module.exports = router;
