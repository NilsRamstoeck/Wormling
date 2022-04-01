import {expect} from 'chai';
import request from 'supertest';
import {app} from '../src/app';

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

   it('can access database');

   describe('/user', () => {

      it('can create user');
      it('can get user');
      it('can modify user');
      it('can delete user');

   });

   after(() => {
   });

});
