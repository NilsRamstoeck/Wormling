import { HttpError } from '@curveball/http-errors/dist';
import {expect} from 'chai';
import {retrieveUser, createUser, database, modifyUser} from '../src/modules/user';

describe('User module', () => {

   const userData = {
      username: 'JohnDoe_user',
      password: 'password',
   };

   it('can create user', (done) => {

      createUser(userData)
      .then(() => {
         //check that user has been created
         database.usersCollection.find({
            username: userData.username
         })
         .exec((err, users) => {
            if(err){
               done(err);
               return;
            };
            expect(users.length).to.equal(1, 'expect only 1 user');
            expect(users[0].username).to.equal(userData.username, 'expect username to be the same');
            expect(users[0].password).to.equal(userData.password, 'expect password to be the same');
            done();
         });
      })
      .catch((err) => done(err));
   });

   it('can retrieve user', (done) => {
      retrieveUser({...userData})
      .then((user) => {
         expect(user.username).to.equal(userData.username, 'expect username to be the same');
         expect(user.password).to.equal(userData.password, 'expect password to be the same');
         done();
      })
      .catch((err) => done(err));
   });

   it('can modify user', (done) => {
      modifyUser({
         username: userData.username,
         newData: {
            password: 'newPassword'
         }
      })
      .then(() => {
         return retrieveUser({...userData});
      })
      .then((user) => {
         expect(user.username).to.equal(userData.username, 'expect username to be the same');
         expect(user.password).to.equal('newPassword', 'expect password to be the new one');
         done();
      })
      .catch((err: HttpError) => done(err.httpStatus));
   });

   it('can delete user');

   after(() => {
      database.usersCollection.remove({
         username: userData.username
      })
   })

});
