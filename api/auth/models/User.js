const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  profile: {
    name: String,
    location: String,
    picture: String,
  },
}, { timestamps: true });

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (hashError, hash) => {
      if (hashError) { return next(hashError); }
      user.password = hash;
      next();
    });
  });
});

function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
}

UserSchema.methods.comparePassword = comparePassword;

module.exports = model('User', UserSchema);
