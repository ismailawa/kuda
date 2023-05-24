const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

let fakeDatabase = [
  { id: 1, name: 'ismailawa', email: 'ismailawa@gmail.com' },
  { id: 2, name: 'aisha', email: 'aisha@gmail.com' },
  { id: 3, name: 'ibrahim', email: 'ibrahim@gmail.com' },
  { id: 4, name: 'patience', email: 'patience@gmail.com' },
  { id: 5, name: 'destiny', email: 'destiny@gmail.com' },
  { id: 6, name: 'kaat', email: 'kaat@gmail.com' },
];

const PORT = 5001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/users', (req, res, next) => {
  const newUser = { id: fakeDatabase.length + 1, ...req.body };
  fakeDatabase.push(newUser);

  res.status(201).json({
    success: true,
    message: 'creating user was successful',
    data: newUser,
  });
});

app.get('/api/users', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'fetching users was successful',
    data: fakeDatabase,
  });
});

app.get('/api/users/:id', (req, res, next) => {
  let user;
  const id = req.params.id;
  const foundUser = fakeDatabase.filter((user) => user.id === Number(id));

  if (foundUser.length > 0) {
    user = foundUser[0];
  }
  res.status(200).json({
    success: true,
    message: 'fetching user was successful',
    data: user,
  });
});

app.put('/api/users/:id', (req, res, next) => {
  let user;
  const id = req.params.id;
  const foundUser = fakeDatabase.filter((user) => user.id === Number(id));

  if (foundUser.length > 0) {
    user = foundUser[0];
    const index = fakeDatabase.indexOf(user);
    if (index !== -1) {
      fakeDatabase[index] = { ...user, ...req.body };
      user = fakeDatabase[index];
    }
  }
  res.status(200).json({
    success: true,
    message: 'User update was successful',
    data: user,
  });
});

app.delete('/api/users/:id', (req, res, next) => {
  let user;
  const id = req.params.id;
  const foundUser = fakeDatabase.filter((user) => user.id === Number(id));

  if (foundUser.length > 0) {
    user = foundUser[0];
    const index = fakeDatabase.indexOf(user);
    if (index !== -1) {
      fakeDatabase = fakeDatabase.filter((user) => user.id !== Number(id));
    }
  }
  res.status(200).json({
    success: true,
    message: 'delete was successful',
    data: user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
