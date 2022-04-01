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
export const database = new Datastore(IS_TEST ? db_config : undefined);
