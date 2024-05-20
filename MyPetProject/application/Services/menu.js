document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const userInfoDiv = document.getElementById('userInfo');
    const userEmail = document.getElementById('userEmail');
    const logoutButton = document.getElementById('logoutButton');

    if (loggedInUser) {
        const userInfoHtml = `
            <p><strong>Nome:</strong> ${loggedInUser.name}</p>
            <p><strong>Email:</strong> ${loggedInUser.email}</p>
        `;
        userInfoDiv.innerHTML = userInfoHtml;
        userEmail.innerText = loggedInUser.email;
    } else {
        window.location.href = '../../pages/auth/login.html';
    }

    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../pages/auth/login.html';
    });
});