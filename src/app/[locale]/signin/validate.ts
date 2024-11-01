// lib/validate.ts
export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
}

export function validateSigninForm(
  email: string,
  password: string,
): { emailError: string | null; passwordError: string | null } {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  return {
    emailError,
    passwordError,
  };
}
