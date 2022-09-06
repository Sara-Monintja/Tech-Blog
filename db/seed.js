const sequelize = require("../config/connection");
const {faker} = require('@faker-js/faker');
const User = require("../models/user");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");


// seed user
async function seedUsers(number = 10){

    const models = [];

    for (let index = 0; index < number; index++) {
  
        const created = await User.create({
            email: faker.internet.email(),
            name: faker.name.fullName(),
            password: "qwerty12345",
        });

        models.push(created);
    }

    return models;
}


// seed blog 
async function seedBlogs(userPools, number =10){
    // userPools is array of user models

    const models = [];

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
async function seedComments(userPools, blogPools, number = 10) {
    // blogPools is array of user models

    const models = [];

    for (let index = 0; index < number; index++) {
    
        const created = await Comment.create({
            user_id: faker.helpers.arrayElement(userPools).id,
            blog_id: faker.helpers.arrayElement(blogPools).id,
            content: faker.lorem.paragraph(),
        });

        models.push(created);
    }

    return models;

}


async function seed(){

    const users = await seedUsers();

    const blogs = await seedBlogs(users);

    const comments = await seedComments(users, blogs);

}

sequelize.sync({force: true})
.then(seed)
.then(() => process.exit(0));
