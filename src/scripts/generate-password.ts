/**
 * Generate Password
 *
 * Generates a secure random password with mixed characters, numbers, and symbols.
 *
 * @id generatePassword
 * @author neoish
 * @icon Icon.Key
 */
import { randomBytes } from "crypto";

export default function (state: BoopState) {
  const length = 16;
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  let password = "";
  const randomArray = randomBytes(length);

  for (let i = 0; i < length; i++) {
    password += charset[randomArray[i] % charset.length];
  }

  state.text = password;
}
