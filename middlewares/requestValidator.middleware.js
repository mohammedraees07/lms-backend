const emailRegex = /^\S+@\S+\.\S+$/;

const requestValidator = (req, res, next) => {

  const { username, email, password, accountType } = req.body;

  const errors = {};

  if (!username) {
    errors.username = "Username is required";
  } else if (username.length < 5) {
    errors.username = "Username must be at least 5 characters";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (accountType !== "teacher" && accountType !== "student") {
    errors.accountType = "Invalid account type";
  } // this validation is done bcz sometimes someone myt use api to send accType as hacker or smtg so we must make it shld be either of this

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  } 

    next();
  
};

export default requestValidator;
