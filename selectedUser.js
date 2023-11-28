fetch('/selectedUser', { method: 'GET' })
  .then(response => response.json())
  .then(data => {
    displayUser(data);
    completeInput(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const displayUser = (user) => {
    const usersContainer = document.getElementById('userContainer');

    const userDiv = document.createElement('div');
    const image = document.createElement('img');
    const userInfo = document.createElement('div');
    const usernamePara = document.createElement('p');
    const namePara = document.createElement('p');
    const professionPara = document.createElement('p');
    const birthdayPara = document.createElement('p');
    const hr = document.createElement('hr');


    userDiv.classList.add('card', 'm-1', 'mt-4', 'border-secondary', 'text-center');
    userDiv.style.width = '27rem';
    image.src = './img/' + user.image;
    image.alt = 'User Image';

    userInfo.classList.add('card-body');
    usernamePara.classList.add('card-text');
    usernamePara.classList.add('text-center');
    professionPara.classList.add('card-text');
    birthdayPara.classList.add('card-text');

    usernamePara.textContent = `${user.username}`;
    namePara.textContent = `${user.firstname} ${user.lastname}`;
    professionPara.textContent = `${user.profession}`;
    birthdayPara.textContent = `${user.birthday}`;


    userInfo.appendChild(usernamePara);
    userInfo.appendChild(hr);
    userInfo.appendChild(namePara);
    userInfo.appendChild(professionPara);
    userInfo.appendChild(birthdayPara);

    userDiv.appendChild(image);
    userDiv.appendChild(userInfo);


    usersContainer.appendChild(userDiv);
};

const completeInput = (user) => {
    document.getElementById('firstname_input').value = user.firstname;
    document.getElementById('lastname_input').value = user.lastname;
    document.getElementById('username_input').value = user.username;
    document.getElementById('birthday_input').value = user.birthday;
    document.getElementById('profession_input').value = user.profession;
}

