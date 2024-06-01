import { User, addUser, getUserByEmail } from '../../../MyPetProject/domain/models/user.js';

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
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = '../../../MyPetProject/pages/home/index.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        });
    }

    async function postUser() {
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

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const newUser = {
                nome: name,
                email: email,
                senha: password                
            }
            
            fetch('https://back-login.vercel.app/usuarios', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
              })
              .then(response => {
                if(response.status == 200 || response.status == 201){
                    alert('Registro bem-sucedido! Agora você pode fazer login.');
                    window.location.href = '../../../MyPetProject/pages/auth/login.html';
                }

              })
              .catch(error => {
                console.error('Error adding pet:', error.message);
              });            
        });
    }
});