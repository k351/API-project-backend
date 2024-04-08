const joi = require('joi');

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joi.string().min(6).max(32).required().label('Password'),
      passwordConfirm: joi.string().min(6).max(32).required().label('passwordConfirm'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      currentPassword: joi.string().min(6).max(32).required().label('Current Password'),
      newPassword: joi.string().min(6).max(32).required().label('New Password'),
      confirmNewPass: joi.string().min(6).max(32).required().label('Confirm New Password'),
    },
  },
};
