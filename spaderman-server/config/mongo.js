const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((dbConnectionResult) =>
    console.log(
      `Connected to Mongo! Database name: "${dbConnectionResult.connections[0].name}"`
    )
  )
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
