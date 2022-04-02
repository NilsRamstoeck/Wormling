import request from 'supertest';
import { expect } from 'chai';
import { app } from '../src/app';
import { database } from '../src/database';

describe('Wormling API', () => {

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

   describe('/user', () => {

      const userData = {
         username: 'JohnDoe_app_user',
         password: 'password',
      };

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
         it('fails with bad request', (done) => {
            request(app)
            .get('/user')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, done);
         });

         it('can get user', (done) => {
            request(app)
            .get('/user')
            .send({...userData})
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
               const user = res.body;
               expect(user.username).to.equal(userData.username);
               expect(user.password).to.equal(userData.password);
               done();
            })
            .catch((err) => done(err));
         });

         it('fails with inexistant user', (done) => {
            request(app)
            .get('/user')
            .send({
               username: 'JaneDoe'
            })
            .expect('Content-Type', /json/)
            .expect(404, done);
         });

      });

      describe('PATCH', () => {

         it('fails with bad request', (done) => {
            request(app)
            .patch('/user')
            .send()
            .expect(400, done);
         });

         it('can modify user', (done) => {
            request(app)
            .patch('/user')
            .send({
               username: userData.username,
               newData: {
                  password: 'newPassword'
               }
            })
            .expect(200)
            .then(async () => {
               const res = await request(app)
               .get('/user')
               .send({ ...userData })
               .expect('Content-Type', /json/)
               .expect(200);
               const user = res.body;
               expect(user.username).to.equal(userData.username);
               expect(user.password).to.equal('newPassword');
               done();
            })
            .catch((err) => done(err));
         });

         it('fails with inexistant user', (done) => {
            request(app)
            .patch('/user')
            .send({
               username: 'JaneDoe',
               newData: {
                  password: 'newPassword'
               }
            })
            .expect(404, done);
         });
      });

      describe('DELETE', () => {
         it('fails with bad request', (done) => {
            request(app)
            .delete('/user')
            .send()
            .expect(400, done);
         });

         it('can delete user', (done) => {
            request(app)
            .delete('/user')
            .send({
               username: userData.username
            })
            .expect(200)
            .then(async () => {
               await request(app)
               .get('/user')
               .send({ ...userData })
               .expect('Content-Type', /json/)
               .expect(404);
               done();
            })
            .catch((err) => done(err));
         });

         it('fails with inexistant user', (done) => {
            request(app)
            .delete('/user')
            .send({
               username: 'JaneDoe',
               newData: {
                  password: 'newPassword'
               }
            })
            .expect(404, done);
         });
      })

      after(() => {
         database.usersCollection.remove({
            username: userData.username
         });
      })

   });

   describe('/booking', () => {

      // const userData = {
      //    username: 'JohnDoe_PUT',
      //    password: 'password',
      // };
      //
      // const bookingData = {
      //    start: new Date().setTime(new Date().getTime() + 1*1000*60*60).toLocaleString('UTC'),
      //    end: new Date().setTime(new Date().getTime() + 2*1000*60*60).toLocaleString('UTC'),
      // }

      describe('PUT', () => {

         // it('fails with bad request', (done) => {
         //    request(app)
         //    .put('/booking')
         //    .send({
         //    })
         //    .expect('Content-Type', /json/)
         //    .expect(400, done);
         // });

         it('fails with bad request');
         it('can create booking');
         it('cannot create duplicate booking');

         // it('can create booking', (done) => {
         //    request(app)
         //    .put('/booking')
         //    .send({
         //       user: {...userData},
         //       booking: {...bookingData},
         //    })
         //    .expect('Content-Type', /json/)
         //    .expect(200, done)
         // });
         //
         // it('cannot create duplicate booking', (done) => {
         //    request(app)
         //    .put('/booking')
         //    .send({
         //       user: {...userData},
         //       booking: {...bookingData},
         //    })
         //    .expect('Content-Type', /json/)
         //    .expect(409, done);
         // })
      });

      describe('GET', () => {
         it('fails with bad request');
         it('can retreive booking');
         it('fails with inexistant booking');
      });

      describe('PATCH', () => {
         it('fails with bad request');
         it('can modify booking');
         it('fails with inexistant booking');
      });

      describe('DELETE', () => {
         it('fails with bad request');
         it('can delete booking');
         it('fails with inexistant booking');
      });

   });

});
