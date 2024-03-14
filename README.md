# Counter-Strike Pro Player Guessing Game
Made for humans interested in Valve's intellectual property Counter-Strike (cs) and its professional scene. In the game the user guesses cs pro players in a Wordle inspired spectacle.

## Features

The project includes the following features:

- **Main Game**: A guessing game based on CS pro players.
- **Leaderboard**: Tracks points of logged-in players.
- **Profile Management**: Allows users to manage their profiles.
- **Login System**: Enables users to log in.

## Getting Started
Our project for now is hosted in https://noo-web-app.azurewebsites.net/. If we have run out of money in our azure you can setup this project locally.
## Local Setup
Before starting here setup the authentication server in a different project. Authentication repository: https://github.com/nuttie1/noo-web-auth.

Follow these steps to set up the project locally:
1. **Clone the repository**: Use your preferred Git client to clone this repository to your local machine.
2. **Configure Environment Variables**: Rename the `.env.sample` file to `.env` and add the value for `DB_URL` (you get that from the developers ;)).

3. **Install Dependencies**: Run the following command in your terminal to install the necessary dependencies:
    ```bash
    npm i
    ```

4. **Build the Project**: Run the following command in your terminal to build the project:
    ```bash
    npm run build
    ```

5. **Start the Server**: Run the following command in your terminal to start the server:
    ```bash
    npm start
    ```
You're all set! Open the project in your browser at `localhost:4002`.
## Testing
