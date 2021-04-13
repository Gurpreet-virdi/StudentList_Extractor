'use strict';
const mongoose = require('mongoose');

const studentSchema = {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfbirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  purpose: {
    type: String,
    required: false,
  },
};

module.exports = mongoose.model('students', studentSchema);
