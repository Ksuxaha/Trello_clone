import { userName } from "./index.js";

export async function getUserName () {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();
    for(let i = 0; i < 10; i++) {
        userName.push(users[i].name.split(' ')[0]);
    }
}