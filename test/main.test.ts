import {expect} from 'chai';
import {server} from '../src/main';

describe('Wormling API', () => {

   before(() => {
   });

   it('can reach server');
   it('can access database');

   describe('/user', () => {

      it('can create user');
      it('can get user');
      it('can modify user');
      it('can delete user');

   });

   //shutdown server
   after(() => {
      server.close();
   });

});
