const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(bodyParser.json());

(async () => {
  await sequelize.sync();
})();

// 📝 Sign Up API
app.post('/signup', async (req, res) => {
  try {
    const { studentName, email, password, rollNumber, branch, address } = req.body;
    const newUser = await User.create({ studentName, email, password, rollNumber, branch, address });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Sign In API
app.post('/signin', async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    const user = await User.findOne({ where: { rollNumber } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid roll number' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Sign in successful', user }); // optionally return user data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📜 Get all data API
app.get('/all-data', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users); // returns all data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
