export default function validate(email, password) {
  const emailTest = validateEmail(email);
  const passwordTest = validatePassword(password);

  if (emailTest && passwordTest) {
    return true;
  }
}

const validateEmail = (email) => {
  const emailPattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[a-zA-Z]{2,7}$/;
  return emailPattern.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};
