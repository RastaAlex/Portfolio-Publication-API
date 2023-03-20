# Portfolio Publication API

This project is a REST API for a portfolio publication site. It allows users to create, manage, and view portfolios containing images and comments.

## Features

All users can:
- Sign up
- View image feed (image, image description, portfolio name that contains this image) ordered by creation time

Registered users can:
- Log in and log out
- Create portfolios
- Have multiple portfolios
- Upload images to their portfolios
- Delete their own profile
- Delete their own portfolios
- Delete their own images

## Technologies

- PostgreSQL (TypeORM)
- Node.js (using Nest.js)

## Getting Started

1. Clone the repository to your local machine:

```
git clone https://github.com/RastaAlex/Portfolio-Publication-API
```

2. Change into the project directory:

```
cd portfolio-publication-api
```

3. Install dependencies:

```
npm install
```

4. Create a `.env` file with the required configuration settings. Use the `.env.example` file as a reference.

5. Start the development server:

```
npm run start:dev
```

Visit `http://localhost:3000` in your browser to access the API.

## Running Migrations

[WIP]

## API Endpoints

This project exposes the following API endpoints:

### Authentication
- `POST /auth/signup` - Sign up a new user
- `POST /auth/login` - Log in an existing user
- `POST /auth/logout` - Log out the current user

### User
- `GET /users` - Retrieve a list of all users
- `GET /users/:id` - Retrieve a user by ID
- `POST /users` - Create a new user
- `DELETE /users/:id` - Delete a user by ID

### Portfolio
- `GET users/:userId/portfolios` - Retrieve a list of all portfolios by user ID
- `GET users/:userId/portfolios/:portfolioId` - Retrieve a portfolio by ID
- `POST users/:userId/portfolios` - Create a new portfolio
- `DELETE users/:userId/portfolios/:portfolioId` - Delete a portfolio by ID

### Image
- `GET /images` - Retrieve a list of all images
- `GET /images/:imageId` - Retrieve an image by ID
- `POST /images/portfolio/:portfolioId` - Upload an image to a portfolio (with comments)
- `DELETE /images/:imageId` - Delete an image by ID

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve the project.

## License

This project is released under the [MIT License](LICENSE).
