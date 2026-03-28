const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const prisma = require("../prismaClient");

router.get("/", authMiddleware, async (req, res) => {
  const org = await prisma.organization.findUnique({
    where: { id: req.user.organizationId },
  });

  res.json({
    defaultLowStockThreshold: org.defaultLowStockThreshold,
  });
});

router.put("/", authMiddleware, async (req, res) => {
  const { defaultLowStockThreshold } = req.body;

  const updatedOrg = await prisma.organization.update({
    where: { id: req.user.organizationId },
    data: {
      defaultLowStockThreshold: Number(defaultLowStockThreshold),
    },
  });

  res.json(updatedOrg);
});

module.exports = router;
