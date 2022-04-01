import { HttpError } from '@curveball/http-errors/dist';
import {expect} from 'chai';
import {retrieveUser, createUser, database, modifyUser, deleteUser} from '../src/modules/user';

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
      .catch((err: HttpError) => done(err.httpStatus));
   });

   it('can retrieve user', (done) => {
      retrieveUser({...userData})
      .then((user) => {
         expect(user.username).to.equal(userData.username, 'expect username to be the same');
         expect(user.password).to.equal(userData.password, 'expect password to be the same');
         done();
      })
      .catch((err: HttpError) => done(err.httpStatus));
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

   it('can delete user', (done) => {
      deleteUser({...userData})
      .then(() => {
         retrieveUser({...userData})
         .then(() => {
            done(new Error('User should be deleted'));
         })
         .catch((err: HttpError) => {
            expect(err.httpStatus).to.equal(404);
            done();
         });
      })
      .catch((err: HttpError) => done(err.httpStatus));
   });

   after(() => {
      database.usersCollection.remove({
         username: userData.username
      })
   })

});
