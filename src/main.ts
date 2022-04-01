import express from 'express';
import Datastore from 'nedb';

const appdata = process.env.APPDATA ||
(process.platform == 'darwin' ?
process.env.HOME + '/Library/Preferences' :
process.env.HOME + "/.local/share");


const db_config = {
   filename: `${appdata}/Wormling/database`,
    autoload: true
}

//Create in-memory database when testing, load file when in production
const IS_TEST = false;//process.env.IS_TEST == 'true' ? true : false;
export const db = new Datastore(IS_TEST ? db_config : undefined);
export const app = express();
const port = 8080;

app.get('/', (_req, res) => {
   res.send('Hello World!');
});

app.route('/user')
.get((_req, _res) => {

})
.put((_req, _res) => {

})
.patch((_req, _res) => {

})
.delete((_req, _res) => {

});

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
