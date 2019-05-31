/**
 * We created a user (User.create({...}))
 * Then we created posts (objects), pushed reference IDs for them to the user (array) and saved the updated user.
 * (the shape of the posts data on the userSchema determines that posts will be saved to users as IDs).
 * Then we found the user and populated (replaced) the post IDs in the post array on the user object, with the post objects the IDs reference.
 */

var mongoose = require('mongoose');
// Create blog_demo_2 database and connect mongoose to it
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true });

var Post = require('./models/post');
var User = require('./models/user');


// User.create({
//   email: "bob@belcher.com",
//   name: "bob belcher"
// });

// The newly created post is returned to the 'post' parameter in the first callback.
// The found user object is returned to the 'foundUser' parameter in the second callback.
// The updated user object is returned to the 'data' object.
Post.create({
  title: 'How to cook the best burger - part 4',
  content: 'JKHJKHJKKJHKJK'
}, function (err, post) {
  User.findOne({email: 'bob@belcher.com'}, function (err, foundUser) {
    if(err) {
      console.log(err);
    } else {
      foundUser.posts.push(post);
      foundUser.save(function (err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
  })
});

// populate() replaces the post reference IDs on the User object with the posts themselves
// User.findOne({email: 'bob@belcher.com'}).populate('posts').exec(function (err, user) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// })
