import { validateRegistration } from '../screens/RegistrationScreen';

describe('Registration form validation', () => {
 it('returns an error if both fields are empty', () => {
   expect(validateRegistration('', '')).toBe('All fields are required!');
 });

 it('returns an error if name is empty', () => {
   expect(validateRegistration('', 'someone@example.com')).toBe('All fields are required!');
 });

 it('returns an error if email is empty', () => {
   expect(validateRegistration('John Doe', '')).toBe('All fields are required!');
 });

 it('returns an error if email is invalid', () => {
   expect(validateRegistration('John Doe', 'johnexample.com')).toBe('Enter a valid email!');
 });

 it('returns empty string if both fields are valid', () => {
   expect(validateRegistration('John Doe', 'john@example.com')).toBe('');
 });
});