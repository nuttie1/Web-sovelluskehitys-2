import client from './client';
import mongoConnect from './utils/db';

/**
 * The port the server will listen on 
 * Connects to the database and starts the server
 * @type {number} The port number
 * @default 8080
 */
const port = process.env.PORT || 8080;
(async () => {
    try {
      await mongoConnect();
      client.listen(port, () => {
        console.log(`Server is running on port ${port}`);
  
      });
    } catch (error) {
      console.error('Error starting server', error);
      console.error('Port:', port);
      throw error;
    }
  })();