

class User {
    
    constructor(name){
        this.name = name
    }

    showUser() {
        console.log(this.name);
    }
}

const user1 = new User("pepe");

user1.showUser()