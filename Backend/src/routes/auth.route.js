const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { email, password, organizationName } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create org
    const org = await prisma.organization.create({
      data: {
        name: organizationName,
      },
    });

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        organizationId: org.id,
      },
    });

    res.json({ message: "User created", userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        organizationId: user.organizationId,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" },
    );

    res.json({ message: "User login successfull!", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
