let xhr = new XMLHttpRequest();
let userBlock = document.getElementById('user-block');
let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');
let btnNext = document.getElementById('button-next');
let btnPrev = document.getElementById('button-previous');
let counter = 1;



xhr.open('GET', 'https://reqres.in/api/users?page=1', false);

xhr.send();

let response = JSON.parse(xhr.response);

let mappedUsers = response.data.map((user) => {
    user.name = `${user.first_name} ${user.last_name}`
    return user;
})


mappedUsers.forEach((user) => {
    let card = document.createElement('div');
    let cardTitle = document.createElement('h3');
    let cardEmail = document.createElement('p');
    let cardAvatar = document.createElement('img');
    cardAvatar.alt = 'photo-user';
    cardTitle.innerText = user.name;
    cardEmail.innerText = user.email;
    cardEmail.classList.add('page-email');
    cardAvatar.src = user.avatar;
    card.append(cardTitle, cardEmail, cardAvatar);
    page1.insertAdjacentElement('afterbegin', card);
})

userBlock.append(page1)


btnNext.addEventListener('click', () => {
    
    if(counter === 1) {
        page1.classList.add('active')

    xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
    
    xhr.onload = (e) => {
        let response = JSON.parse(e.target.response);
    
        let mappedUsers = response.data.map((user) => {
            user.name = `${user.first_name} ${user.last_name}`
            return user;
        })
    
        mappedUsers.forEach((user) => {
            const card = document.createElement('div');
            const cardTitle = document.createElement('h3');
            const cardEmail = document.createElement('p');
            const cardAvatar = document.createElement('img');
            cardAvatar.alt = 'photo-user';
            cardTitle.innerText = user.name;
            cardEmail.innerText = user.email;
            cardEmail.classList.add('page-email');
            cardAvatar.src = user.avatar;
            card.append(cardTitle, cardEmail, cardAvatar);
            page2.insertAdjacentElement('afterbegin', card);
        })
    }

    userBlock.append(page2);
    xhr.send();
    counter++
    }

    page1.classList.add('active')
    page2.classList.remove('active')

})

btnPrev.addEventListener('click', () => {
    page2.classList.add('active')
    page1.classList.remove('active')
})


let inputName = document.getElementById('user-name');
let inputSurname = document.getElementById('surname');
let inputEmail = document.getElementById('email');
let inputJob = document.getElementById('job');
let addButton = document.getElementById('add-button');
let createUsersBlock = document.getElementById('create-users');
let errorMessage = document.getElementById('error');


addButton.addEventListener('click', () => {
    if(!inputName.value || !inputSurname.value || !inputEmail.value || !inputJob.value) {
        errorMessage.innerText = 'Всі поля мають бути заповнені';
        return;
    }

    let newPerson = {
        name: `${inputName.value} ${inputSurname.value}`,
        email: inputEmail.value,
        job: inputJob.value,
    }

    xhr.open('POST', 'https://reqres.in/api/users', false);

    xhr.setRequestHeader('content-type', 'application/json')

    xhr.send(JSON.stringify(newPerson))

    let response = JSON.parse(xhr.response);


    let newCard = document.createElement('div');
    let newCardTitle = document.createElement('h3');
    let newCardEmail = document.createElement('p');
    let newCardJob = document.createElement('p');
    newCardTitle.innerText = response.name;
    newCardEmail.innerText = response.email;
    newCardJob.innerText = response.job;
    newCard.append(newCardTitle, newCardEmail, newCardJob);
    newCard.classList.add('newCard');
    createUsersBlock.append(newCard);

    inputName.value = '';
    inputSurname.value = '';
    inputEmail.value = '';
    inputJob.value = '';
    errorMessage.innerText = '';
})
