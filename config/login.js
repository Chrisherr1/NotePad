const bcrypt = require('bcrypt');
const db = require('../config/db'); 

// Create new user (Signup)
async function createUser(name, email, password) {
//Check if user already exists
const [existingUsers] = await db.query(
'SELECT * FROM users WHERE email = ?', 
[email]
);

    if (existingUsers.length > 0) {
    throw new Error('Email already registered');
    }

  // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
    const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
    );

    return { user_id: result.insertId, name, email };
}

// Login user
async function loginUser(email, password) {
  // Find user by email
    const [users] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  
  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }
  
  const user = users[0];
  
  // Compare password with hashed password
  const match = await bcrypt.compare(password, user.password);
  
  if (!match) {
    throw new Error('Invalid email or password');
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

module.exports = { createUser, loginUser };