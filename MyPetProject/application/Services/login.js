import { User, getUserByEmail, addUser } from '../../domain/models/user.js';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Usuários de exemplo (normalmente você os obteria de uma API ou banco de dados)
    addUser(new User(1, 'João', 'joao@example.com', '123456'));
    addUser(new User(2, 'Maria', 'maria@example.com', 'abcdef'));

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const user = getUserByEmail(email);
            if (user && user.password === password) {
                // Armazenar o usuário logado na memória
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = '../../pages/home/index.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const newUser = new User(Date.now(), name, email, password);
            addUser(newUser);
            console.log({ name, email, password });
            alert('Registro bem-sucedido! Agora você pode fazer login.');
            window.location.href = 'login.html';
        });
    }
});
