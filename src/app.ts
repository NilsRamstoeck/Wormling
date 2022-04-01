import express from 'express';
import {HttpError} from '@curveball/http-errors';
import {
   createUser
} from './modules/user';


export const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
   res.status(200).json({msg:'Hello World!'});
});

app.route('/user')
.get((_req, _res) => {

})
.put((req, res) => {
   createUser(req.body)
   .then(() => res.status(200).json())
   .catch((err: HttpError) => {
      res.status(err.httpStatus).json();
   });
})
.patch((_req, _res) => {

})
.delete((_req, _res) => {

});
