document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const userGreetingDiv = document.getElementById('userGreeting');
    const logoutButton = document.getElementById('logoutButton');

    if (loggedInUser) {
        const greetingHtml = `
            <h2>Hello, ${loggedInUser.name}! We're glad to see you here 😊</h2>
        `;
        userGreetingDiv.innerHTML = greetingHtml;
    } else {
        window.location.href = '../../pages/auth/login.html';
    }

    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../pages/auth/login.html';
    });
});