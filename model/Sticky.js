import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const stickySchema = new Schema({
  c: Number,
  t: String,
  T: String,
  x: Number,
  y: Number,
  w: Number,
  h: Number
});

const Sticky = model("Sticky", stickySchema);
export default Sticky