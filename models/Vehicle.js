const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  kind: {
    type: String,
    enum: ["car", "truck", "plane", "helicopter"],
  },
  color: {
    type: String,
  },
  brand: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
