let xhr = new XMLHttpRequest();
let userBlock = document.getElementById('user-block');
let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');
let btnNext = document.getElementById('button-next');
let btnPrev = document.getElementById('button-previous');
let counter = 1;


function openFirstPage() {
    if(counter === 1) {
        
        xhr.open('GET', 'https://reqres.in/api/users?page=1', true);

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
                cardTitle.innerText = `${user.name}  id: ${user.id}`;
                cardEmail.innerText = user.email;
                cardEmail.classList.add('page-email');
                cardAvatar.src = user.avatar;
                card.append(cardTitle, cardEmail, cardAvatar);
                page1.insertAdjacentElement('beforeend', card);
            })
        }

    userBlock.append(page1);
    xhr.send();
    counter++
    }
}

openFirstPage()

function nextOpenPage() {
    if(counter === 2) {
        while (page2.firstChild) {
            page2.firstChild.remove();
        }

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
                cardTitle.innerText = `${user.name}  id: ${user.id}`;
                cardEmail.innerText = user.email;
                cardEmail.classList.add('page-email');
                cardAvatar.src = user.avatar;
                card.append(cardTitle, cardEmail, cardAvatar);
                page2.insertAdjacentElement('beforeend', card);
            })
        }

        userBlock.append(page2);
        xhr.send();
        counter--
    }
    page1.classList.add('active')
    page2.classList.remove('active')
}

function lastOpenPage() {
    if(counter === 1) {
        while (page1.firstChild) {
            page1.firstChild.remove();
        }
        xhr.open('GET', 'https://reqres.in/api/users?page=1', true);

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
                cardTitle.innerText = `${user.name}  id: ${user.id}`;
                cardEmail.innerText = user.email;
                cardEmail.classList.add('page-email');
                cardAvatar.src = user.avatar;
                card.append(cardTitle, cardEmail, cardAvatar);
                page1.insertAdjacentElement('beforeend', card);
            })
        }

    userBlock.append(page1);
    xhr.send();
    counter++
    }

    page2.classList.add('active')
    page1.classList.remove('active')
}

btnNext.addEventListener('click', nextOpenPage);


btnPrev.addEventListener('click', lastOpenPage);



let inputName = document.getElementById('user-name');
let inputSurname = document.getElementById('surname');
let inputEmail = document.getElementById('email');
let inputJob = document.getElementById('job');
let inputId = document.getElementById('id-number');
let addButton = document.getElementById('add-button');
let updateButton = document.getElementById('update-button');
let deleteButton = document.getElementById('delete-button');
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

    xhr.send(JSON.stringify(newPerson));

    let response = JSON.parse(xhr.response);
    console.log(response.id);


    let newCard = document.createElement('div');
    let newCardTitle = document.createElement('h3');
    let newId = document.createElement('p');
    let newCardEmail = document.createElement('p');
    let newCardJob = document.createElement('p');
    newId.innerText = response.id;
    newId.classList.add('id-number');
    newCardTitle.innerText = response.name;
    newCardTitle.classList.add('new-user-title');
    newCardEmail.innerText = response.email;
    newCardEmail.classList.add('new-user-email');
    newCardJob.innerText = response.job;
    newCardJob.classList.add('new-user-job');
    newCard.append(newId, newCardTitle, newCardEmail, newCardJob);
    newCard.classList.add('newCard');
    createUsersBlock.append(newCard);

    console.log(createUsersBlock);

    inputName.value = '';
    inputSurname.value = '';
    inputEmail.value = '';
    inputJob.value = '';
    errorMessage.innerText = '';
})

updateButton.addEventListener('click', () => {
    let updateNum = inputId.value;
    let updateCardArray = document.getElementsByClassName('newCard');

    let updatePerson = {
        name: `${inputName.value} ${inputSurname.value}`,
        email: inputEmail.value,
        job: inputJob.value,
    }

    xhr.open('PUT', `https://reqres.in/api/users/${updateNum}`, true);

    xhr.onload = (e) => {

        let response = JSON.parse(e.target.response);
        if(e.target.status === 200) {
            for (let updateCard of updateCardArray) {
                let idNumber = updateCard.querySelector('.id-number').innerText
                if (idNumber === updateNum) {
                    updateCard.querySelector('.new-user-title').innerText = response.name;
                    updateCard.querySelector('.new-user-email').innerText = response.email;
                    updateCard.querySelector('.new-user-job').innerText = response.job;
                }
            }
        }
    }

    xhr.setRequestHeader('content-type', 'application/json')

    xhr.send(JSON.stringify(updatePerson));

    inputName.value = '';
    inputSurname.value = '';
    inputEmail.value = '';
    inputJob.value = '';
    inputId.value = '';
    
})


deleteButton.addEventListener('click', () => {
    let delatePerson = inputId.value;
    let delateCardArray = document.getElementsByClassName('newCard');
    
    xhr.open('DELETE', `https://reqres.in/api/users/${delatePerson}`, true);

    xhr.onload = (e) => {
        if(e.target.status === 204) {
            for (let delateCard of delateCardArray) {
                let idNumber = delateCard.querySelector('.id-number').innerText
                if (idNumber === delatePerson) {
                    delateCard.remove();
                }
            }
        }
    }

    xhr.send();

    inputId.value = '';
})

