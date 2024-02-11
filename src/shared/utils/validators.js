export const emailRegexPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
//atleast 8 characters long with at least one lower case, one uppercase and one digit.
export const passwordRegexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/