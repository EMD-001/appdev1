const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const User = require("../Models/user.model");
const Book = require("../Models/book.model");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await User.deleteMany();
    await Book.deleteMany();

    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
      });
      users.push(await user.save());
    }

    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Book.create({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        userId: randomUser._id,
      });
    }

    console.log("Seed completed!");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
