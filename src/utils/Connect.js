import mongoose from 'mongoose'

export default async function Connect() {
  try {
    await mongoose.connect("mongodb+srv://Admin:H2w9s738klwm8Dja@stickynotecluster.7dzlvmk.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) {
    console.error(err);
  }
}