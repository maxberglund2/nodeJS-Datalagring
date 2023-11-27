
  
//fs.writeFileSync('users.json', JSON.stringify(user),{flag:'a+'});
const express = require('express');
const fs = require('fs');
const jsonPath = 'users.json';
const app = express();
const port = 3000;

// check if json exists
try {
  if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, "[]", 'utf8');
      console.log('File created!')
  }
} catch(err) {
console.error(err)
}

// read file and put into a variable
const data = fs.readFileSync(jsonPath, 'utf8');
const users = JSON.parse(data);
console.log(users);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/home.html');
});
app.get('/add.html', (req, res) => {
  res.sendFile(__dirname + '/html/add.html');
});
app.get('/edit.html', (req, res) => {
  res.sendFile(__dirname + '/html/edit.html');
});
app.get('/list.html', (req, res) => {
  res.sendFile(__dirname + '/html/list.html');
});

app.use(express.json()); // Parse JSON bodies

app.post('/addUser', (req, res) => {
  const { username, birthday, image, job } = req.body;
  addUser(username, birthday, image, job);
  res.send('User added successfully!');
});

const addUser = (username, birthday, image, job) => {
try {

  const newUser = {
    "username": username,
    "birthday": birthday,
    "image": image,
    "job": job
  };

  users.push(newUser);

  const updatedJson = JSON.stringify(users, null, 2);

  fs.writeFileSync(jsonPath, updatedJson, 'utf8');

  console.log('JSON file updated successfully!');
} catch (err) {
  console.error('Error:', err);
}};

//addUser("User1", "2023.11.27", "./img/photo1.jpg", "jobless");

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});