# Home Library Service

This application allows you to manage and interact with a digital library through a RESTful API. OpenAPI documentation is available to provide detailed information about each endpoint.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Environment Variables

The application uses environment variables to configure its behavior. Create a `.env` file in the root directory and set the following variables:

- `PORT` (default: `4000`): Specifies the port the server will run on.
- `DATABASE_URL`: The URL for connecting to the database.
- `JWT_SECRET`: Secret key for JSON Web Token (JWT) authentication.

Example `.env` file:

```env
PORT=4000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

## Running application

```
npm start
```

## API Documentation

The Home Library Service exposes endpoints to manage tracks, albums, and artists. For detailed information, refer to the OpenAPI documentation available at: (http://localhost:4000/api-docs/)

For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Example API Requests

To test the endpoints, here are some example API requests using `curl`:

```bash
# Add a track to favorites
curl -X POST http://localhost:4000/favs/track/{trackId}

# Get all favorite items
curl -X GET http://localhost:4000/favs G
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```

npm run test

```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
