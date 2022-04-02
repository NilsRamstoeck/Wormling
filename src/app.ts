import express from 'express';
import { HttpError } from '@curveball/http-errors';
import {
   createUser,
   deleteUser,
   modifyUser,
   retrieveUser
} from './modules/user';
import {
   createBooking,
   deleteBooking,
   modifyBooking,
   retrieveBookings
} from './modules/booking';

export const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
   res.status(200).json({msg:'Hello World!'});
});

app.route('/user')
.get((req, res) => {
   retrieveUser(req.body)
   .then((user) => res.status(200).json(user))
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.put((req, res) => {
   createUser(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.patch((req, res) => {
   modifyUser(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.delete((req, res) => {
   deleteUser(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
});

app.route('/booking')
.get((req, res) => {
   retrieveBookings(req.body)
   .then((bookings) => res.status(200).json(bookings))
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.put((req, res) => {
   createBooking(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.patch((req, res) => {
   modifyBooking(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.delete((req, res) => {
   deleteBooking(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
});
