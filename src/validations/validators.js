//Validations using  Regex
//--------------------------Validation for Name and taskname -----------------------------------------------------------------------------//
const validname = (text) => {
  const check = /^[a-zA-Z ]*$/
  return check.test(text)
}

//-------------------------------Validation for Email -------------------------------------------------------------------------------------//
function validEmail(email) {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+\.[a-zA-Z-.]+$/
  return emailRegex.test(email)
}

//------------------------------Validation for Password----------------------------------------------------------------------------------//
function validPassword(password) {
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
  return passwordRegex.test(password)
}

//------------------------------regex for only letter and digit----------------------------------------------------------------------------//
function validstrdigit(value) {
  const strdigi = /^[a-zA-Z0-9\s]+$/
  return strdigi.test(value)
}

//-------------------------------------------------------------------------------------------------------------------------------------//

module.exports = { validname, validEmail, validPassword, validstrdigit }
