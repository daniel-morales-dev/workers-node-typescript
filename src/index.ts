import "dotenv/config";
import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Development mode");
  }

  console.log(`Server is running on port ${PORT}`);
});
