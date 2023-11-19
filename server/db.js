import mongoose from "mongoose";

export default () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.DB_URI, connectionParams);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to database");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from database");
  });
};
