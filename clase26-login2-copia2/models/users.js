const mongoose = require('mongoose');
const bcrypt=require("bcrypt")

const userSchema = 
mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    date:{type: Date, default: Date.now}
})
userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {

        bcrypt.hash(this.password, 10, (err, hashedPass) => {
            if (err) {
                next(err)
            } else {
                this.password = hashedPass
                next()
            }
        })
    } else {
        next()
    }
})
module.exports = mongoose.model("Users", userSchema);