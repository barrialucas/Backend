const mongoose = require('mongoose');
const bcrypt=require("bcrypt")

const userSchema = 
mongoose.Schema({
    user: {type:String, required:true, unique:true},
    pass: {type:String, required:true},
})
userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {

        bcrypt.hash(this.pass, 10, (err, hashedPass) => {
            if (err) {
                next(err)
            } else {
                this.pass = hashedPass
                next()
            }
        })
    } else {
        next()
    }
})

userSchema.methods.correctPassword=function(pass,cb){
    bcrypt.compare(pass,this.pass,function(err,res){
        if(err){
            cb(err)
        }else{
            cb(err,res)
        }
    })
}
 
module.exports = mongoose.model("Users", userSchema);