require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./routes/auth.routes");
const resourceRoute = require("./routes/resources.routes");
const reservationsRoute = require("./routes/reservation.routes");

//creating database
const createDB = require("./db/createDb")(async () => {
  await createDB().catch((err) => {
    console.error("error creating database", err);
  });
});
const { initDb } = require("./db/pgDbInIt");
const { authorize, authenticate } = require("./middleware/auth.middleware");

//creating table
initDb();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/reservations", authenticate, reservationsRoute);
app.use("/resources", authenticate, authorize, resourceRoute);

app.get("/", (req, res) => {
  res.send("HIII");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is listening at port ${PORT}`));
