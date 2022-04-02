import { app } from './app';

const port = 8080;
export const server = app.listen(port, () => console.log('server started at ' + port));

//Error handling
server.on('error', (err: NodeJS.ErrnoException) => {
   console.log(err.code);
   if(err.code == 'EADDRINUSE'){
      console.log('Address in use');
      server.close();
   };
});

//Gracefully shut down on SIGTERM
process.on('SIGTERM', () => {
   server.close();
});
