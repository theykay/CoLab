const router = require('express').Router();
const { request } = require('express');
const { User } = require('../models');

//Restful API Time Full Routes are commented above routers.
//api/user/
router.route('/')
    //  get users
    .get((req, res) => {
        User.find({})
            .then(data => {
                res.json({ success: true, data })
            })
            .catch(err => {
                console.log(err)
                res.json({ success: false });
            });
    })
    // add user
    .post((req, res) => {
        console.log({ reqBody: req.body });
        User.create(req.body
            // username: req.body.username,
            // firstname: req.body.firstname,
            // lastname: req.body.lastname,
            // pronouns: req.body.pronouns,
            // email: req.body.email,
            // password: req.body.password,
            // roles: req.body.roles,
            // age: req.body.age,
            // bio: req.body.bio,
            // links:[{
            // instagram: req.body.instagram,
            // twitter: req.body.twitter,
            // facebook: req.body.facebook,
            // soundcloud: req.body.soundcloud,
            // spotify: req.body.spotify,
            // bandcamp: req.body.bandcamp,
            // youtube: req.body.youtube,
            // audiomack: req.body.audiomack
            // }],
            // lookingfor: req.body.lookingfor
        )
            .then(newUser => {
                console.log(newUser);
                res.json({ success: true })
            })
            .catch((err) => {
                console.log(err);
                res.json({ success: false });
            })
    });


// api/user/:id   This path is used so you can search by username not the object ID
router.route('/:id')
    //get specific user
    .get((req, res) => {
        User.find({username: req.params.id})

            .then((data) => {
                console.log(data)
                res.json({ success: true, data })
            })

            .catch( err => {
                console.log(err)
                res.json( { success: false } )
            })
    })

    //update specific user via username
    .put((req, res) => {
        User.findOneAndUpdate({username: req.params.id}, req.body)
            .then((data) => {
                res.json( { success: true } )
            })
            .catch(err => {
                console.log(err);
                res.json( {success: false} )
            })        
    })

    //delete a user via the username
    .delete((req, res) => {
        User.deleteOne({username: req.params.id})
            .then((data) => {
                res.json({user: "Deleted"})
            })
            .catch(err => {
                console.log(err);
                res.json( {success: false} )
            })

    });

//route to search for cetain kinds of users

//export the module
module.exports = router;