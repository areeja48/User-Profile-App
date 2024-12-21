const express = require("express");
const app = express();
const cors = require("cors");
const authenticateToken = require("./middleware/tokenValidation");


// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Allow only frontend running on localhost:3000 to make requests
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // If needed, allow cookies to be sent with requests
}));

// Import and use models
const db = require("./models");

// Routers
const postRouter = require("./routes/postRoutes");
app.use("/posts", postRouter);

const commentsRouter = require("./routes/commentRoutes");
app.use("/comments", authenticateToken, commentsRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

// Sync models and start server
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

