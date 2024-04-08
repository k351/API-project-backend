const { User } = require('../../../models');
const { hashPassword } = require('../../../utils/password');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Check if a user with the given email already exists
 * @param {string} email - Email to check
 * @returns {Promise<boolean>}
 */
async function checkIfUserExistsByEmail(email) {
  const user = await User.findOne({ email });
  return user; // Return true if user exists, false otherwise
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} password - Email
 * @returns {Promise}
 */
async function changePassword(id, password) {
  // Hash the new password
  const hashedPassword = await hashPassword(password);

  // Update the user's password in the database
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        password: hashedPassword, // Set the hashed password in the database
      },
    }
  );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkIfUserExistsByEmail,
  changePassword,
};
