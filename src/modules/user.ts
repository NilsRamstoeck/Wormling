import type { WormlingUser } from '../wormling';
import {
   BadRequest,
   Conflict,
   NotFound
} from '@curveball/http-errors';
import { database } from '../database';

export function createUser(data: any): Promise<void>{
   return new Promise<void>((resolve, reject) => {
      const username = data?.username;
      const password = data?.password;

      if(!(username && password)) {
         reject(new BadRequest());
         return;
      };

      database.usersCollection.insert({
         username,
         password
      }, (err) => {
         if(!err) resolve();
         else reject(new Conflict());
      });
   });
}

export function retrieveUser(data: any): Promise<WormlingUser>{
   return new Promise<WormlingUser>((resolve, reject) => {
      const username = data?.username;

      if(!username){
         reject(new BadRequest);
         return;
      }

      database.usersCollection.findOne({
         username
      }, (err, doc) => {
         if(!err && doc) resolve(doc);
         else reject(new NotFound);
      });
   });
}

export function modifyUser(data: any): Promise<void>{
   return new Promise<void>((resolve, reject) => {
      const username = data?.username;

      if(!username){
         reject(new BadRequest);
         return;
      }

      const newUserData: any = {};

      if(data.newData?.password){
         newUserData.password = data.newData.password;
      }

      database.usersCollection.update({
         username
      }, {
         $set: {...newUserData}
      }, {}, (err, n) => {
         if(!err && n) resolve();
         else reject(new NotFound);
      });

   });
}

export function deleteUser(data: any): Promise<void>{
   return new Promise<void>((resolve, reject) => {
      const username = data?.username;

      if(!username){
         reject(new BadRequest);
         return;
      }

      database.usersCollection.remove({
         username
      }, {}, (err, n) => {
         if(!err && n) resolve();
         else reject(new NotFound);
      });
   });
}
