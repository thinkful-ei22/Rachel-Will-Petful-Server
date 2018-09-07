'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();
const Queue = require('./queueClass');

//Queue instance of DOGS
const dogsQ = new Queue();
dogsQ.enqueue({
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
});
dogsQ.enqueue({
  imageURL: "https://hairstylecamp.com/wp-content/uploads/long-haired-duchshund.jpg",
  imageDescription: 'A miniature long haired Daschund running joyfully in the grass',
  name: "Fredrick",
  sex: "male",
  age: 12,
  breed: "Miniature long haired Daschund",
  story: "Former champion abandoned after he became too old to compete in the Doxie Derby"
});
dogsQ.enqueue({
  imageURL: "https://cdn2-www.dogtime.com/assets/uploads/gallery/saint-bernard-dogs-and-puppies/saint-bernard-dogs-puppies-1.jpg",
  name: "Nana",
  sex: "female",
  age: 3,
  breed: "St. Bernard",
  story: "Owners retired and moved to a tropical climate after deciding they no longer wanted to or needed help to take care of their grandchildren"
});


//Queue instance of CATS
const catsQ = new Queue();
catsQ.enqueue({
  imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});
catsQ.enqueue({
  imageURL: 'https://d3544la1u8djza.cloudfront.net/APHI/Blog/2016/12_December/what+do+Russian+Blue+cats+look+like+_+cat+resting+on+a+sofa.jpg',
  imageDescription: 'Russian blue cat looking at camera ',
  name: 'Merideth',
  sex: 'Female',
  age: 7,
  breed: 'Russian Blue',
  story: 'Very sweet kitty, just has an unfortunate resting bitch face'
});
catsQ.enqueue({
  imageURL: 'https://talgv.org/wp-content/uploads/2017/01/Oolong_2-400x250.jpg',
  imageDescription: 'Diluted tortoiseshell kitten lounging',
  name: 'Ella',
  sex: 'Female',
  age: 1,
  breed: 'Diluted tortoiseshell',
  story: 'Scrappy little runt of the litter found in park just a few days old'
});

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//---- GET and DELETE first cat ----// 
app.get('/api/cat', (req, res, next) => {
  console.log('Reached Cat GEt endpoint>>>>>>');
  return res.json(catsQ.peek());
});


app.delete('/api/cat', (req, res, next) => {
  //console.log('DElete Dog Reached');
  catsQ.dequeue();
  return res.json();
});


//---- GET and DELETE first dog ----//
app.get('/api/dog', (req, res, next) => {
  return res.json(dogsQ.peek());

});

app.delete('/api/dog', (req, res, next) => {
  console.log('DElete Dog Reached');
  dogsQ.dequeue();
  return res.json();
});


//
function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
