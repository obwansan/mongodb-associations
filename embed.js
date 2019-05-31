var mongoose = require('mongoose');
// Create blog_demo database and connect mongoose to it
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true });

// POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String
});

var Post = mongoose.model('Post', postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema] // Associates the postSchema with the userSchema
});

var User = mongoose.model('User', userSchema);

var newUser = new User({
  email: 'linus@vanpelt.edu',
  name: 'Linus Van Pelt'
});

newUser.posts.push({
  title: 'The Great Pumpkin',
  content: 'Get ready for Halloween, hes coming!'
});

newUser.save(function (err, user) {
  if(err) {
    console.log(err);
  } else {
    console.log(user);
  }
});

var newPost = new Post({
  title: 'Reflections on apples',
  content: 'They are delicious'
});

newPost.save(function (err, post) {
  if(err) {
    console.log(err);
  } else {
    console.log(post);
  }
});

User.findOne({name: 'Linus Van Pelt'}, function (err, user) {
  if(err) {
    console.log(err);
  } else {
    user.posts.push({
      title: 'Philsophical reflections 2',
      content: 'I love humanity, it\'s people I can\'t stand!.'
    });
    user.save(function(err, user) {
      if(err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});

// RESULT
/*
{ _id: 5cf0ea1f72c353306880125e,
  email: 'linus@vanpelt.edu',
  name: 'Linus Van Pelt',
  posts:
   [ { _id: 5cf0ea1f72c353306880125f,
       title: 'The Great Pumpkin',
       content: 'Get ready for Halloween, hes coming!' },
     { _id: 5cf0ed5138e7eb466e562dd0,
       title: 'Philsophical reflections',
       content: 'The benefits of a security blanket are much underrated.' },
     { _id: 5cf0ee17d3a8e94bb79a812c,
       title: 'Philsophical reflections 2',
       content: "I love humanity, it's people I can't stand!." } ],
  __v: 2 }
*/