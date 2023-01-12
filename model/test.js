const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  testString: {
    type: String,
    required: true
  } 
});

module.exports = Test = mongoose.model("Test", testSchema);