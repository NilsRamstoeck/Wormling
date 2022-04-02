import { HttpError } from '@curveball/http-errors';
import { expect } from 'chai';
import { database } from '../src/database';
import { createBooking, retrieveBookings } from '../src/modules/booking';

describe('Booking module', () => {

   const userData = {
      username: 'JohnDoe_module_booking',
      password: 'password',
   };

   const bookingData = {
      start: new Date().setTime(new Date().getTime() + 1*1000*60*60).toLocaleString(),
      end: new Date().setTime(new Date().getTime() + 2*1000*60*60).toLocaleString(),
   }

   it('can create booking', (done) => {
      createBooking({
         user: {...userData},
         booking: {...bookingData}
      })
      .then(() => {
         //check that booking has been created
         database.bookingsCollection.find({
            creator: userData.username
         })
         .exec((err, bookings) => {
            if(err){
               done(err);
               return;
            };
            expect(bookings.length).to.equal(1, 'expect only 1 booking');
            expect(bookings[0].creator).to.equal(userData.username, 'expect creator to be user');
            expect(bookings[0].start).to.equal(bookingData.start, 'expect start to be the same');
            expect(bookings[0].end).to.equal(bookingData.end, 'expect end to be the same');
            done();
         });
      })
      .catch((err: HttpError) => done(err.httpStatus));
   });

   it('can retrieve bookings', (done) => {
      retrieveBookings({
         creator: userData.username
      })
      .then((bookings) => {
         expect(bookings.length).to.equal(1, 'expect only 1 booking');
         expect(bookings[0].creator).to.equal(userData.username, 'expect creator to be user');
         expect(bookings[0].start).to.equal(bookingData.start, 'expect start to be the same');
         expect(bookings[0].end).to.equal(bookingData.end, 'expect end to be the same');
         done();
      })
      .catch((err: HttpError) => done(err.httpStatus));
   });

   it('can modify booking');
   it('can delete booking');

   after(() => {
      database.bookingsCollection.remove({
         creator: userData.username
      }, {multi: true});
   })

});
