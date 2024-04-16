const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ghanemdev22@gmail.com",
    pass: "aysyjoytyclkknsd"
  }
})

//confirmation email in register
const sendConfirmation = (email,plainPassword) => {
  transport.sendMail({
      from: "ghanemdev22@gmail.com",
      to: email,
      subject: "Welcome to our company",
      html: `<div>
      <h1>Welcome to our company</h2>
      <h2>Hello<h2>
      <p>To can enter in our company, please enter this email and this password :<p>
      <p> email: ${email}<p>
      <p> password: ${plainPassword}<p>
      </div>
      `
  }) 
  .catch((err) => console.log(err));
}

// forget password
const   sendForgetPassword= (email,userId,token) => {
  transport.sendMail({
      from: "ghanemdev22@gmail.com",
      to: email,
      subject: "Password Reset!",
      html: `<div>
      <h1>Password Reset!</h2>
      <h2>Hello<h2>
      <p>To reset your password, please click on the link</p>
      <a href=http://localhost:3000/auth/requestResetPassword/${userId}/${token}>
      Click here! </a>
      </div>
      `
  }) 
  .catch((err) => console.log(err));
}

const resetPasswordEmail = (email, password) => {
  transport.sendMail({
      from: "managementemployees1@gmail.com",
      to: email,
      subject: "Welcome back to our company ",
      html: `<div>
      <h1>Welcome back to our company </h1>
      <h2>Hello<h2>
      <p>Your password is updated :<p>
      <p> email: ${email}<p>
      <p> password: ${password}<p>
      `
  }) 
  .catch((err) => console.log(err));
}
module.exports = {sendConfirmation,sendForgetPassword,resetPasswordEmail }