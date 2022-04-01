import {expect} from 'chai';
import request from 'supertest';
import {app} from '../src/app';
import {database} from '../src/modules/user';


describe('Wormling API', () => {

   before(() => {
   });

   it('can reach server', (done) => {
      request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
         const data = res.body;
         expect(data?.msg).to.equal('Hello World!', 'Response message');
         done();
      })
      .catch((err) => {
         done(err);
      });
   });

   const userData = {
      username: 'JohnDoe_PUT',
      password: 'password',
   };

   describe('/user', () => {


      describe('PUT', () => {
         it('fails with bad request', (done) => {
            request(app)
            .put('/user')
            .send({
            })
            .expect('Content-Type', /json/)
            .expect(400, done);
         });

         it('can create user', (done) => {
            request(app)
            .put('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200, done)
         });

         it('cannot create duplicate user', (done) => {
            request(app)
            .put('/user')
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(409, done);
         })
      });

      describe('GET', () => {
         it('can get user');
      });

      describe('PATCH', () => {
         it('can modify user');
      });

      describe('DELETE', () => {
         it('can delete user');
      })

   });

   after(() => {
      console.log('CLEANUP APP');

      database.usersCollection.remove({
         username: userData.username
      });
   })

});
