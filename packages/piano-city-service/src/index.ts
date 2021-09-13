// SERVER
import SERVER from './server';

import './routes';

SERVER.listen(8080, '0.0.0.0', (err, address) => {
  if (err) {
    SERVER.log.error(err.message);
    process.exit(1);
  }
  SERVER.log.info(`server listening on ${address}`);
});
