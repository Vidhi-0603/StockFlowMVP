require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./src/routes/auth.route");
const productRoutes = require("./src/routes/product.route");
const dashboardRoutes = require("./src/routes/dashboard.route");
const settingsRoutes = require("./src/routes/settings.route");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/settings", settingsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
