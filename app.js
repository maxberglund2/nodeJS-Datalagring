//fs.writeFileSync('users.json', JSON.stringify(user),{flag:'a+'});
const express = require('express');
const app = express();
const port = 3000;

const url = require('url');

const fs = require('fs');
const jsonPath = 'users.json';

const multer = require('multer');
const upload = multer({ dest: 'img/' });

let selectedUser = undefined;

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

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});
app.get('/create.html', (req, res) => {
  res.sendFile(__dirname + '/html/create.html');
});
app.get('/edit', (req, res) => {
  res.sendFile(__dirname + '/html/update.html');

  const query = url.parse(req.url, true).query;
  selectedUser = users[query.user];
  console.log(selectedUser);
});
app.get('/read.html', (req, res) => {
  res.sendFile(__dirname + '/html/read.html');
});

app.use(express.json()); // Parse JSON bodies

app.post('/createUser', upload.single('image'), (req, res) => {
  const { firstname, lastname, username, birthday, profession } = req.body;
  const image = req.file ? req.file.filename : '';


  addUser(firstname, lastname, username, birthday, image, profession);
  res.redirect('/read.html');
});

app.post('/updateUser', upload.single('image'), (req, res) => {
  const { firstname, lastname, username, birthday, profession } = req.body;
  const image = req.file ? req.file.filename : '';


  updateUser(firstname, lastname, username, birthday, image, profession);
  res.redirect('/read.html');
});

const addUser = (firstname, lastname, username, birthday, image, profession) => {
try {

  const newUser = {
    "firstname": firstname,
    "lastname": lastname,
    "username": username,
    "birthday": birthday,
    "image": image,
    "profession": profession
  };

  users.push(newUser);

  const updatedJson = JSON.stringify(users, null, 2);

  fs.writeFileSync(jsonPath, updatedJson, 'utf8');

  console.log('JSON file updated successfully!');
} catch (err) {
  console.error('Error:', err);
}};

const updateUser = (firstname, lastname, username, birthday, image, profession) => {
  try {
  
    selectedUser.firstname = firstname;
    selectedUser.lastname = lastname;
    selectedUser.username = username;
    selectedUser.birthday = birthday;
    selectedUser.image = image;
    selectedUser.profession = profession;


    // Update the user in the 'users' array
    const userIndex = users.findIndex(user => user.username === selectedUser.username);
    if (userIndex !== -1) {
      users[userIndex] = selectedUser;
    }

    // Write the updated 'users' array back to the JSON file
    const updatedJson = JSON.stringify(users, null, 2);
    fs.writeFileSync(jsonPath, updatedJson, 'utf8');

    console.log('JSON file updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }};

app.get('/displayUsers',(req,res)=>{
  res.json(users);
 });
app.get('/selectedUser',(req,res)=>{
res.json(selectedUser);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/index.html`);
});