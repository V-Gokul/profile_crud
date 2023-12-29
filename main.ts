import express from "express";
import profileRouter from "./src/route/profile.route";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/profile", profileRouter);
console.log("works");
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
