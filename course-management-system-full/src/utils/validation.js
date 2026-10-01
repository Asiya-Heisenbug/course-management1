export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.trim());
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateLogin(values) {
  const errors = {};
  if (!values.email.trim() || !validateEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!values.password) errors.password = "Password is required.";
  return errors;
}

export function validateRegistration(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Full name is required.";
  if (!values.username.trim()) errors.username = "Username is required.";
  if (!values.email.trim() || !validateEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!validatePhone(values.phone)) errors.phone = "Enter a valid 10-digit Indian phone number.";
  if (!validatePassword(values.password)) errors.password = "Password must contain at least 8 characters.";
  if (values.password !== values.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  return errors;
}
