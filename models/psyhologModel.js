import mongoose from "mongoose";

const psyhologScheme = mongoose.Schema({
  psyhoglogName: String,
  psyhoglogPassword: {
    type: String,
    // required: [true, 'Введите логин'],
  },
  psyhoglogEmail: {
    type: String,
    // unique: [true, 'Эта почта уже зарегестрирована'],
    // required: true,
  },
  scrf_token: {
    type: String,
  },
  vkontakteId: String,
});

psyhologScheme.statics.findOrCreate = function findOrCreate(profile, cb) {
  const psyhologObj = new this();
  // console.log(userObj );
  // req.session.user = userObj;
  this.findOne({ _id: profile.id }, (err, result) => {
    if (!result) {
      psyhologObj.psyhoglogName = profile.displayName;
      // ....
      psyhologObj.save(cb);
      // console.log(req.session);
    } else {
      cb(err, result);
    }
  });
};

export default mongoose.model('psyhologs', psyhologScheme);
