//fs.writeFileSync('users.json', JSON.stringify(user),{flag:'a+'});
const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
const jsonPath = 'users.json';

const multer = require('multer');
const upload = multer({ dest: 'img/' });

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
app.get('/update.html', (req, res) => {
  res.sendFile(__dirname + '/html/update.html');
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

app.get('/displayUsers',(req,res)=>{
  res.json(users);
 });

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/index.html`);
});