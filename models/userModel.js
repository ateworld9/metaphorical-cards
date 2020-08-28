import mongoose from "mongoose";

const userScheme = mongoose.Schema({
  userName: String,
  userPassword: {
    type: String,
    // required: [true, 'Введите логин'],
  },
  userEmail: {
    type: String,
    // unique: [true, 'Эта почта уже зарегестрирована'],
    // required: true,
  },
  scrf_token: {
    type: String,
  },
  vkontakteId: String,
});

userScheme.statics.findOrCreate = function findOrCreate(profile, cb){
  let userObj = new this();
  // console.log(userObj );
  // req.session.user = userObj;
  this.findOne({_id : profile.id},function(err,result){ 
      if(!result){
          userObj.userName = profile.displayName;
          //....
          userObj.save(cb);
          // console.log(req.session);
      }else{
          cb(err,result);
      }
  });
};

export default mongoose.model("users", userScheme);
