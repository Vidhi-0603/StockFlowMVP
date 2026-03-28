const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./src/routes/auth.route");
const productRoutes = require("./src/routes/product.route");
const dashboardRoutes = require("./src/routes/dashboard.route");
const settingsRoutes = require("./src/routes/settings.route");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/settings", settingsRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
