class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

const userDatabase = [];

function addUser(user) {
    userDatabase.push(user);
}

function getUserByEmail(email) {
    return userDatabase.find(user => user.email === email);
}

export { User, addUser, getUserByEmail };