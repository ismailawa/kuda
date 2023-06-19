const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const PORT = 5001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kuda',
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting to database: ' + err.message);
  } else {
    console.log('Database connected suceesfully');
  }
});

app.post('/api/users', (req, res, next) => {
  connection.query(
    'INSERT INTO users(name,email) VALUES (?,?)',
    Object.values(req.body),
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        res.status(201).json({
          success: true,
          message: 'creating user was successful',
          data: result,
        });
      }
    }
  );
});

app.get('/api/users', (req, res, next) => {
  connection.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'fetching users was successful',
        data: result,
      });
    }
  });
});

app.get('/api/users/:id', (req, res, next) => {
  const id = req.params.id;
  connection.query('SELECT * FROM users WHERE id =?', id, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'fetching user was successful',
        data: result,
      });
    }
  });
});

app.put('/api/users/:id', (req, res, next) => {
  let user;
  const id = req.params.id;
  connection.query(
    'UPDATE users SET ? WHERE id = ?',
    [req.body, id],
    (err, result) => {
      if (err) {
        console.error(err.message);
      } else {
        res.status(200).json({
          success: true,
          message: 'User update was successful',
          data: result,
        });
      }
    }
  );
});

// app.delete('/api/users/:id', (req, res, next) => {
//   let user;
//   const id = req.params.id;
//   const foundUser = fakeDatabase.filter((user) => user.id === Number(id));

//   if (foundUser.length > 0) {
//     user = foundUser[0];
//     const index = fakeDatabase.indexOf(user);
//     if (index !== -1) {
//       fakeDatabase = fakeDatabase.filter((user) => user.id !== Number(id));
//     }
//   }
//   res.status(200).json({
//     success: true,
//     message: 'delete was successful',
//     data: user,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
