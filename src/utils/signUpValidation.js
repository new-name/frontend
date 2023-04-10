const NAME_REGEX = /^[가-힣a-zA-Z]+$/;
const EMAIL_REGEX =
  /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

function isValidName(name) {
  return NAME_REGEX.test(name);
}

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}

function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}

function isValidPasswordConfirm(passwordConfirm, password) {
  return passwordConfirm === password;
}

export default {
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordConfirm,
};
