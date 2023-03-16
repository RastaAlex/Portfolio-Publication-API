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

- PostgreSQL (using Sequelize)
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

To create and run migrations for the database, use the following commands:

1. Generate a migration file:

```
npx sequelize-cli migration:generate --name migration-name
```

2. Edit the generated file with the required changes.

3. Run the migration:

```
npx sequelize-cli db:migrate
```

4. To undo a migration, use the following command:

```
npx sequelize-cli db:migrate:undo
```

## API Endpoints

This project exposes the following API endpoints:

### User

- `POST /auth/signup` - Sign up a new user
- `POST /auth/login` - Log in an existing user
- `POST /auth/logout` - Log out the current user
- `GET /user` - Retrieve the current user's profile
- `DELETE /user` - Delete the current user's profile
- `POST /user/portfolios` - Create a new portfolio
- `DELETE /user/portfolios/:portfolioId` - Delete a portfolio by ID
- `POST /user/portfolios/:portfolioId/images` - Upload an image to a portfolio
- `DELETE /user/portfolios/:portfolioId/images/:imageId` - Delete an image from a portfolio

### Portfolio

- `GET /portfolios` - Retrieve a list of all portfolios
- `GET /portfolios/:portfolioId` - Retrieve a portfolio by ID

### Image

- `GET /images` - Retrieve a list of all images
- `GET /images/:imageId` - Retrieve an image by ID
- `POST /images/:imageId/comments` - Add a comment to an image
- `GET /images/:imageId/comments` - Retrieve all comments for an image
- `GET /images/:imageId/comments/:commentId` - Retrieve a specific comment for an image
- `DELETE /images/:imageId/comments/:commentId` - Delete a specific comment for an image

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests to improve the project.

## License

This project is released under the [MIT License](LICENSE).
