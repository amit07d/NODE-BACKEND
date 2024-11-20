const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

personSchema.pre('save', async function (next) {
  const person = this;

  // Only hash the password if it has been modified or is new
  if (!person.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(11);
    const hashPassword = await bcrypt.hash(person.password, salt); // Correct method
    person.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isPasswordEqual = await bcrypt.compare(candidatePassword, this.password)
    return isPasswordEqual
  } catch (error) {
    throw error
  }
}

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
