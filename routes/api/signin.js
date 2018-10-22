const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  app.post('api/accounts/signup', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      password,
      status
    } = body;
    let {
      email
    } = body;
    if(!firstName) {
      res.end({
        success: false,
        message: 'Error: First Name cannot be blank'
      });
    }
    if(!lastName) {
      res.end({
        success: false,
        message: 'Error: Last Name cannot be blank'
      });
    }
    if(!email) {
      res.end({
        success: false,
        message: 'Error: Email cannot be blank'
      });
    }
    if(!password) {
      res.end({
        success: false,
        message: 'Error: Password cannot be blank'
      });
    }
    if(!status) {
      res.end({
        success: false,
        message: 'Error: Status cannot be blank'
      });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
const newUser = new User();
newUser.firstName = firstName;
newUser.lastName = lastName;
newUser.status = status;
newUser.email = email;
newUser.password = newUser.generateHash(password);
newUser.save((err, user) => {
  if (err) {
    return res.send({
      success: false,
      message: 'Error: Server error'
    });
  }
  return res.send({
    success: true,
    message: 'Signed up'
  });
});
});
  });
  app.post('api/accounts/signin', (req, res, next) => {
    const {body} = req;
    const {
      firstName,
      lastName,
      password,
      status
    } = body;
    let {
      email
    } = body;

    if(!email) {
      res.end({
        success: false,
        message: 'Error: Email cannot be blank'
      });
    }
    if(!password) {
      res.end({
        success: false,
        message: 'Error: Password cannot be blank'
      });
    }
    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email:email
    }, (err, users) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error! Server error'
        });
      }
      if(users.length !== 1) {
        return res.send({
          success:false,
          message: 'Error! Invalid'
        });
      }
      const user = users[0];
      if(!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error! Invalid'
        })
      }
      //Otherwise Correct UserSchema
      const NewUserSession = new UserSession();
      NewUserSession.userId = user._id;
      NewUserSession.save((err, doc) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error! server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid Sign in',
          token: doc._id

        });
      });
    });

  });

    app.get('api/accounts/verify', (req, res, next) => {
      const {query} = req;
      const {token} = query;

      UserSession.find({
        _id: token,
        isDeleted: false
      }, (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error! Server Error'
          });
        }
        if (sessions.length !== 1) {
          return res.send({
            success: false,
            message: 'Error! Invalid'
          })
        } else {
          return res.send ({
            success: true,
            message: 'Good'
          })
        }
      })


    });

    app.post('api/accounts/logout', (req, res, next) => {
      const {query} = req;
      const {token} = query;

      UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
      }, {
        $set:{isDeleted:true}
      }, null,  (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error! Server Error'
          });
        }
        if (sessions.length !== 1) {
          return res.send({
            success: false,
            message: 'Error! Invalid'
          })
        } else {
          return res.send ({
            success: true,
            message: 'Good'
          })
        }
      })


    });

};
