class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

const userDatabase = []; // Simulação de banco de dados em memória

function addUser(user) {
    userDatabase.push(user);
    console.log("Users: ", userDatabase);
}

function getUserByEmail(email) {
    return userDatabase.find(user => user.email === email);
}

export { User, addUser, getUserByEmail };