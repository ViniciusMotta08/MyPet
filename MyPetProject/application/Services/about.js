document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const logoutButton = document.getElementById('logoutButton');

    if (!loggedInUser) {
        window.location.href = '../../../MyPetProject/pages/auth/login.html';
    } 

    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = '../../../MyPetProject/pages/auth/login.html';
    });
});