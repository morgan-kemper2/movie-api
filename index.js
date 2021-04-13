// const express = require('express'),
//   morgan = require('morgan');
//   uuid = require('uuid');
//   mongoose = require('mongoose');
//   Models = require('./models.js');
//   bodyParser = require('body-parser');
//   methodOverride = require('method-override');


  

// const Movies = Models.Movie;
// const Users = Models.User;

// // mongoose.connect('mongodb://localhost/myflixdb', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useFindAndModify: false,
// //   useCreateIndex: true
// // });

// mongoose.connect( process.env.connection_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// });

// const app = express();
// app.use(morgan('common'));
// app.use(express.static('public'))

// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.use(bodyParser.json());

// const passport = require('passport');
// require('./passport');

// let auth = require('./auth')(app);

// // const cors = require('cors');
// // app.use(cors());
// // let allowedOrigins = ["http://localhost:8080", "http://localhost:1234", "https://findamovieflix.herokuapp.com", "http://localhost:4200","https://morgan-kemper2.github.io/myflix-angular-client2/welcome"];


// // app.use(cors()); //By default, this will allow all domains to make requests to the API. The commented code below restricts this to specific origins.
// // app.use(function (request, response, next) {
// //   response.header("Access-Control-Allow-Origin", "*");
// //   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// //   next();
// // });

// const { check, validationResult } = require('express-validator');

// app.use(methodOverride());


// //list of all movies
// app.get("/", function (req, res) {
//   return res.status(400).send("Welcome to my Flix App");
// });

// app.get("/movies", function (
//   req, res) {
//   Movies.find()
//     .then(function (movies) {
//       res.status(201).json(movies);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });
// //get information about movie by title
// app.get("/movies/:Name", passport.authenticate('jwt', {session: false}), function (req, res) {
//   Movies.findOne({ Name: req.params.Name })
//     .then(function (movies) {
//       res.json(movies);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get data about director
// app.get("/movies/director/:Name", passport.authenticate('jwt', {session: false}), function (req, res) {
//   Movies.findOne({ "Director.Name": req.params.Name })
//     .then(function (movies) {
//       res.json(movies);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// }); 

// //get data about genre by name
// app.get("/movies/genre/:Name", passport.authenticate('jwt', {session: false}), function (req, res) {
//   Movies.findOne({ "Genre.Name": req.params.Name })
//     .then(function (movies) {
//       res.json(movies.Genre);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get list of users
// app.get("/users", passport.authenticate('jwt', {session: false}), function (
//   req,
//   res
// ) {
//   Users.find()
//     .then(function (users) {
//       res.status(201).json(users);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.status(500).send("Error: " + err);
//     });
// });

// //get a user by username
// app.get(
//   "/users/:Username", passport.authenticate('jwt', {session: false}),
//   function (req, res) {
//     Users.findOne({ Username: req.params.Username })
//       .then(function (user) {
//         res.json(user);
//       })
//       .catch(function (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       });
//   }
// );

// //Add new user
// /* We’ll expect JSON in this format
// {
//  ID : Integer,
//  Username : String,
//  Password : String,
//  Email : String,
//  Birthday : Date
// }*/

// app.post('/users',
// [
//   check('Username', 'Username is required').isLength({min: 5}),
//   check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
//   check('Password', 'Password is required').not().isEmpty(),
//   check('Email', 'Email does not appear to be valid').isEmail()
// ],
//   (req, res) => {
//     let errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     let hashedPassword = Users.hashPassword(req.body.Password);
//     Users.findOne({ Username: req.body.Username })
//       .then((user) => {
//         if (user) {
//           return res.status(400).send(req.body.Username + " already exists");
//         } else {
//           Users.create({
//             Username: req.body.Username,
//             Password: hashedPassword,
//             Email: req.body.Email,
//             Birthday: req.body.Birthday,
//           })
//             .then((user) => {
//               res.status(201).json(user);
//             })
//             .catch(function (error) {
//               console.error(error);
//               res.status(500).send("Error: " + error);
//             });
//         }
//       })
//       .catch(function (error) {
//         console.error(error);
//         res.status(500).send("Error: " + error);
//       });
//   }
// );
// // delete user from the list by username
// app.delete(
//   "/users/:Username",
//   function (req, res) {
//     Users.findOneAndRemove({ Username: req.params.Username })
//       .then(function (user) {
//         if (!user) {
//           res.status(400).send(req.params.Username + " was not found");
//         } else {
//           res.status(200).send(req.params.Username + " was deleted.");
//         }
//       })
//       .catch(function (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       });
//   }
// );

// // Update user info by username
// /* We’ll expect JSON in this format
// {
//   Username: String,
//   (required)
//   Password: String,
//   (required)
//   Email: String,
//   (required)
//   Birthday: Date
// }*/
// app.put(
//   "/users/:Username",
//   function (req, res) {
//     let hashedPassword = Users.hashPassword(req.body.Password);
//     Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       {
//         $set: {
//           Username: req.body.Username,
//           Password: hashedPassword,
//           Email: req.body.Email,
//           Birthday: req.body.Birthday,
//         },
//       },
//       { new: true }, //this line makes sure that the updated document is returned
//       function (err, updatedUser) {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error: " + err);
//         } else {
//           res.json(updatedUser);
//         }
//       }
//     );
//   }
// );

// // Add movie to favorites list
// app.post(
//   "/users/:Username/movies/:MovieID",
//   function (req, res) {
//     Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       {
//         $push: { FavoriteMovies: req.params.MovieID },
//       },
//       { new: true }, // This line makes sure that the updated document is returned
//       function (err, updatedUser) {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error: " + err);
//         } else {
//           res.json(updatedUser);
//         }
//       }
//     );
//   }
// );

// // delete movie from favorite list for user
// app.delete(
//   "/users/:Username/movies/:MovieID",
//   function (req, res) {
//     Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       { $pull: { FavoriteMovies: req.params.MovieID } },
//       { new: true },
//       function (err, updatedUser) {
//         if (err) {
//           console.error(err);
//           res.status(500).send("Error: " + err);
//         } else {
//           res.json(updatedUser);
//         }
//       }
//     );
//   }
// );



// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// const port = process.env.PORT || 8080;
// app.listen(port, '0.0.0.0', () => {
//   console.log('Listening on port ' + port);
// });

const path = require('path');
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const Models = require('./models.js');

app.use(bodyParser.json());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect('mongodb://localhost:27017/myFlixDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to movies api');
});

//Get list of movies with authentication
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //res.json(topmovies);
    Movies.find()
      .then(movies => {
        res.status(201).json(movies);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Get list of users
app.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Get a user by Username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Get data about a movie using authentication
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Get description of a genre with authentication
app.get(
  '/movies/genre/:Genre',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Genre })
      .then(movie => {
        res.json(movie.Genre);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Get a director's details using authentication
app.get(
  '/movies/director/:Director',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Director })
      .then(movie => {
        res.json(movie.Director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//Create a new user without using authentication
app.post(
  '/users',
  //Validation logic
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Only alphanumeric allowed').isAlphanumeric(),
    check('Password', 'Password is required')
      .not()
      .isEmpty(),
    check('Email', 'Email not valid').isEmail()
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);

    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already Exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);

//Update a user's details using authentication
app.put(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Add a movie as favorite using authentication
app.post(
  '/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID }
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Remove a movie from favorites using authentication
app.delete(
  '/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

//Delete a user using authentication
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(user => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(400).send('Error: ' + err);
      });
  }
);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on port ' + port);
});
// app.listen(8080, () => console.log('Your app is listening on port 8080.'));

app.use(express.static('public'));
app.use('/client', express.static(path.join(__dirname, 'client', 'dist')));
app.get('/client/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});