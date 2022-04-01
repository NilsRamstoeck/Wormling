import express from 'express';

export const app = express();

app.get('/', (_req, res) => {
   res.status(200).json({msg:'Hello World!'});
});

app.route('/user')
.get((_req, _res) => {

})
.put((_req, _res) => {

})
.patch((_req, _res) => {

})
.delete((_req, _res) => {

});
