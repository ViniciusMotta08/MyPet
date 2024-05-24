import { User, addUser, getUserByEmail } from '../../domain/models/user.js';

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    async function fetchUsers() {
        try {
            const response = await fetch('https://back-login.vercel.app/usuarios');
            if (response.ok) {
                const apiUsers = await response.json();
                apiUsers.forEach(user => addUser(new User(user.id, user.nome, user.email, user.senha)));
            } else {
                console.error('Failed to fetch users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    fetchUsers();

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
                    
            alert('Registro bem-sucedido! Agora você pode fazer login.');
            window.location.href = '../../pages/auth/login.html';
        });
    }
});