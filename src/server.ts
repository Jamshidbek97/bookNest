import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.info(`The server is successfully running on PORT: ${PORT}`);
      console.info(
        `Admin project is successfully running on PORT: ${PORT}/admin \n`
      );
    });
  })
  .catch((err) => console.log("ERROR on Connecting MongoDB", err));
