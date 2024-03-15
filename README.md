# Counter-Strike Pro Player Guessing Game
Made for humans interested in Valve's intellectual property Counter-Strike (cs) and its professional scene. In the game the user guesses cs pro players in a Wordle inspired spectacle.

## Features

The project includes the following features:

- **Main Game**: A guessing game based on CS pro players.
- **Leaderboard**: Tracks points of logged-in players.
- **Profile Management**: Allows users to manage their profiles.
- **Login System**: Enables users to log in.

### Technologies
<div >
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192107856-aa92c8b1-b615-47c3-9141-ed0d29a90239.png" alt="GraphQL" title="GraphQL"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183911544-95ad6ba7-09bf-4040-ac44-0adafedb9616.png" alt="Microsoft Azure" title="Microsoft Azure"/>
</div>

## Getting Started
Our project for now is hosted in [csgg.fi](https://csgg.fi/). If we have run out of money in our azure you can setup this project locally.

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
After local environment has been set you can run the tests by command:
```bash
npm run test-graphql
```
To test the api manually you can access the Apollo Sandbox with `localhost:4002/graphql` or straight in the azure with `/graphql`. 

In the main game page there is a question mark icon that opens a help page.

## Conclusion
Project is a fun time killer with ability to compare scores with friends. Try to sharpen your cs2 pro scene knowledge. Game works without registering (you do not get point).

Made by Niko Ala-aho, Onni Pajula and Otto Palssa
