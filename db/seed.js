// seed user

const sequelize = require("../config/connection");
const {faker} = require('@faker-js/faker');
const User = require("../models/user");

const models = [];


async function seedUsers(number = 10){

    
    for (let index = 0; index < number; index++) {
  
        const created = await User.create({
            email: faker.internet.email(),
            name: faker.name.fullName(),
            password: "qwerty",
        });

        models.push(created);
    }

    return models;
}


// seed blog 
async function seedBlogs(userPools, number =10){
    // userPools is array of user models

    for (let index = 0; index < number; index++) {
    
        const created = await Blog.create({
            user_id: faker.helpers.arrayElement(userPools).id,
            title: faker.music.songName(),
            content: faker.lorem.paragraph(),
        });

        models.push(created);
    }

    return models;

}


// seed comment




async function seed(){

    const users = await seedUsers();

}
