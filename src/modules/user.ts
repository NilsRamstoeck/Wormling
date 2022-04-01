import {
   BadRequest,
   Conflict
} from '@curveball/http-errors';

import {WormlingDB} from '../database';

export const database = new WormlingDB();

export function createUser(data: any): Promise<void>{
   return new Promise((resolve, reject) => {
      if(!(data.username && data.password)) {
         reject(new BadRequest());
         return;
      };

      database.usersCollection.insert({
         username: data.username,
         password: data.password
      }, (err) => {
         if(!err) resolve();
         else reject(new Conflict());
      });
   });
}
