const express = require("express");
const cors = require("cors");

const app = express();
const authRoutes = require("./src/routes/auth.route");
app.use(cors());
app.use(express.json());



app.use("/auth", authRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
