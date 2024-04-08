const usersRepository = require('./users-repository');
const { hashPassword } = require('../../../utils/password');
const { passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check if email is available (not already in use)
 * @param {string} email - Email to check
 * @returns {Promise<boolean>}
 */
async function checkEmailAvailability(email) {
  try {
    // Panggil fungsi dari repository untuk memeriksa ketersediaan email
    const isAvailable = await usersRepository.checkIfUserExistsByEmail(email);
    return isAvailable;
  } catch (error) {
    console.error('Error checking email availability:', error);
    throw new Error('Error checking email availability');
  }
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} password - password
 * @returns {boolean}
 */

async function changePassword(id, password) {
  const user = await usersRepository.changePassword(id, password);

  if (!user) {
    return false; // Return false if user not found or password doesn't match
  }

  return true; // Return true if user found and password matches
}

/**
 * Check username and password for login.
 * @param {string} id - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(id, password) {
  const user = await usersRepository.getUser(id);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  return passwordChecked;
}


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmailAvailability,
  changePassword,
  checkLoginCredentials,
};
