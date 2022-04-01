import Datastore from 'nedb';

const appdata = process.env.APPDATA ||
(process.platform == 'darwin' ?
process.env.HOME + '/Library/Preferences' :
process.env.HOME + "/.local/share");

export class WormlingDB {
   usersCollection!: Datastore<any>;

   constructor(){
      this.loadCollections()
   }

   private loadCollections(){
      this.usersCollection = new Datastore({
         filename: `${appdata}/Wormling/users.db`,
         autoload: true
      });

      this.usersCollection.ensureIndex({
         fieldName: 'username',
         unique: true
      }, (err) => {
         if(!err)return;

      })

   }

}
