let form = document.getElementById('form');
let login = document.getElementById('login');
let password = document.getElementById('password');
let errorLogin = document.getElementById('error-message-login');
let errorPassword = document.getElementById('error-message-password');
let userUndefined = document.getElementById('user-undefined');
let formContainer = document.getElementById('form-container');


login.addEventListener('blur', checkLogin);
password.addEventListener('blur', chekPassword);
login.addEventListener('focus', checkLoginCorrect);
password.addEventListener('focus', chekPasswordCorrect);


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let loginInput = login.value;
    let passwordInput = password.value;

    xhr.open('POST', 'https://reqres.in/api/register', true);

    xhr.onload = (e) => {
        try {
            if(e.target.status === 400) {
                userUndefined.textContent = 'Такого користувача не знайдено! Введіть повторно дані';
                login.value = '';
                password.value = '';
                return;
            }
            formContainer.classList.add('correct');
        } catch (error) {
            console.warn('Only defined users succeed registration');
        }
    }

    if(!loginInput) {
        errorLogin.textContent = 'Поле не має бути порожнім';
        login.classList.add('form-input-error');
        return;
    }

    if(!passwordInput) {
        errorPassword.textContent = 'Поле не має бути порожнім';
        password.classList.add('form-input-error');
        return;
    }

    let register = {
        email: loginInput,
        password: passwordInput
    }

    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(JSON.stringify(register))

})