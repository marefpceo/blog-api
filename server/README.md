# Blog-API

[Home](../README.md)

## Server

- Run `npm install` to install dependencies
- Create an .env file in the project's root directory and add the following project variables:
  > - `SECRET` stores secret phrase to validate session authentication
  > - `SITE_COUNT_ID` id of the database record to store site visit counter data
  > - `CLOUD_STORAGE_URL` (optional) URL of cloud storage if local storage is not utilized
  > - `DATABASE_URL` database connection URL

### Usage

- Enter `npm run serverstart` to start the application
- Open web browser and navigate to `https://localhost:3000`

### Technologies Used

- [NodeJS](https://www.nodejs.org/) is a cross-platform, open-source JavaScript runtime environment that runs on the V8 JavaScript engine. Node.js lets developers use JavaScript to write command line tools and for server-side scripting
- [ExpressJS](https://www.expressjs.org/) is a back end web application framework for building web applications and APIs.
- [PostgreSQL](https://www.postgresql.org/) is a free and open-source relational database management system emphasizing extensibility and SQL compliance.
- [Prisma ORM](https://www.prisma.io/) is an open-source next-generation ORM.
- [Passport](https://www.passportjs.org/) is authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
- [Express Validator](https://express-validator.github.io/) middleware used to validate and sanitize form input data.
- [EJS](https://ejs.co/) is a simple templating language that lets you generate HTML markup with plain JavaScript.
- [Cloudinary](https://cloudinary.com/) provides cloud-based image and video management services. It enables users to upload, store, manage, manipulate, and deliver images and video for websites and apps.
