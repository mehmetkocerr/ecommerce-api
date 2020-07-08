const UserModel = require('../model/UserModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const tokenList = {};

exports.UserRegister = async (req, res) => {
  // Validation data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database
  const { status } = await UserModel.FindOne(req.body.email);
  if (status) return res.status(400).send('Email already exists.');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    UserModel.Register(userData)
      .then(function (rows) {
        res.json(rows.insertId);
      })
      .catch((err) =>
        setImmediate(() => {
          res.send(err);
        })
      );
  } catch (error) {
    res.status(400).send(err);
  }
};

exports.UserLogin = async (req, res) => {
  // Validation data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const { status, data } = await UserModel.FindOne(req.body.email);
  if (!status) return res.status(400).send('Email is not found');

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, data[0].password);
  if (!validPass) return res.status(400).send('Invalid password');

  var resultData = Object.values(JSON.parse(JSON.stringify(data)));

  //Create and asign a token
  const token = jwt.sign(resultData[0], process.env.TOKEN_SECRET, {
    expiresIn: '24h',
  });
  const refreshToken = jwt.sign(
    resultData[0],
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '48h',
    }
  );
  const response = {
    status: 'Logged in',
    token: token,
    refreshToken: refreshToken,
  };
  tokenList[refreshToken] = response;
  res.status(200).header('Authorization', token).json(response);
};

exports.UserFind = async (req, res) => {
  res.json({
    user: req.user,
  });
};
exports.UserLogout = async (req, res) => {
  jwtr.destroy(token);
  res.status(200);
};

exports.Token = async (req, res) => {
  const postData = req.body;
  if (postData.refreshToken in tokenList) {
    const user = {
      email: postData.email,
      password: postData.password,
    };
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: '24h',
    });
    const response = {
      token: token,
    };
    // update the token in the list
    tokenList[postData.refreshToken].token = token;
    res.status(200).json(response);
  } else {
    res.status(404).send('Invalid request');
  }
};
