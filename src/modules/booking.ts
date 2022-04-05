import {
   BadRequest,
   Conflict,
   NotFound
} from '@curveball/http-errors';
import { database } from '../database';

export function createBooking(data: any): Promise<void> {
   return new Promise<void>((resolve, reject) => {
      const username = data?.user?.username;
      const start = data?.booking?.start;
      const end = data?.booking?.end;

      if(!(username && start && end)){
         reject(new BadRequest());
         return;
      }

      database.bookingsCollection.insert({
         creator: username,
         start,
         end,
      }, (err) => {
         if(!err) resolve();
         else reject(new Conflict());
      });
   });
}

export function retrieveBookings(data: any): Promise<any[]> {
   return new Promise<any[]>((resolve, reject) => {
      const creator = data?.creator;

      if(!creator){
         reject(new BadRequest);
         return;
      }

      database.bookingsCollection.find({
         creator
      })
      .exec((err, docs: any[]) => {
         if(!err && docs.length >= 0) resolve(docs);
         else reject(new NotFound);
      });
   });

}

export function modifyBooking(data: any) {
   return new Promise<void>((resolve, reject) => {
      const bookingID = data?._id;

      if(!bookingID){
         reject(new BadRequest);
         return;
      }

      const newBookingData: any = {};

      if(data.newData?.start){
         newBookingData.start = data.newData.start;
      }

      if(data.newData?.end){
         newBookingData.end = data.newData.end;
      }

      database.bookingsCollection.update({
         _id: bookingID
      }, {
         $set: {...newBookingData}
      }, {}, (err, n) => {
         if(!err && n) resolve();
         else reject(new NotFound);
      });

   });
}

export function deleteBooking(data: any) {
   return new Promise<void>((resolve, reject) => {
      const bookingID = data?._id;

      if(!bookingID){
         reject(new BadRequest);
         return;
      }

      database.bookingsCollection.remove({
         _id: bookingID
      }, {}, (err, n) => {
         if(!err && n) resolve();
         else reject(new NotFound);
      });
   });
}
