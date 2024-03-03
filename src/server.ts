import client from './client';
import mongoConnect from './utils/db';

const port = process.env.PORT || 4000;
(async () => {
    try {
      await mongoConnect();
      client.listen(port, () => {
        console.log(`Server is running on port ${port}`);
  
      });
    } catch (error) {
      console.error('Error starting server', error);
    }
  })();