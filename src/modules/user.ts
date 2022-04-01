import type { WormlingUser } from '../wormling';

import {
   BadRequest,
   Conflict,
   NotFound
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

export function retrieveUser(data: any): Promise<WormlingUser>{
   return new Promise((resolve, reject) => {
      const username = data?.username;

      if(!username){
         reject(new BadRequest);
         return;
      }

      database.usersCollection.findOne({
         username: username
      }, (err, doc) => {
         if(!err && doc) resolve(doc);
         else reject(new NotFound);
      });
   });
}
