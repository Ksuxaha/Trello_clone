import { userName } from "./index.js";

export const getUserName  = async   ()  => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();


    for(let user of users) {
        userName.push(user.name.split(' ')[0]);

    }
}

getUserName();