const bcrypt = require("bcryptjs")


function hashPasswordGenrate (password){
    const hashpassword = bcrypt.hash(password , 10)
    return hashpassword
}


const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};





module.exports = {
    hashPasswordGenrate,
    comparePassword
}