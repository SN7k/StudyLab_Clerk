// Simple test file to verify email parser functionality
import { parseUniversityEmail, calculateCurrentYear, getProgramFullName } from './emailParser';

// Test cases for email parsing
const testEmails = [
  'bwubca23734@brainwareuniversity.ac.in',
  'bwumca24789@brainwareuniversity.ac.in',
  'bwubtech23712@brainwareuniversity.ac.in',
  'bwumtech24756@brainwareuniversity.ac.in',
  'invalid@brainwareuniversity.ac.in',
  'bwubca23@brainwareuniversity.ac.in',
  'bwubca23734@gmail.com',
  'student@university.edu'
];

console.log('Testing Email Parser:');
console.log('=====================');

testEmails.forEach(email => {
  const result = parseUniversityEmail(email);
  console.log(`\nEmail: ${email}`);
  console.log(`Valid: ${result.isValid}`);
  if (result.isValid) {
    console.log(`Program: ${result.program} (${getProgramFullName(result.program)})`);
    console.log(`Admission Year: 20${result.year}`);
    console.log(`Student ID: ${result.studentId}`);
    console.log(`Current Year: Year ${calculateCurrentYear(result.year)}`);
  }
});

// Test current year calculation
console.log('\n\nCurrent Year Calculation Test:');
console.log('==============================');
const currentYear = new Date().getFullYear();
console.log(`Current Year: ${currentYear}`);

// Test different admission years
[23, 24, 25, 26].forEach(admissionYear => {
  const currentYearNum = calculateCurrentYear(admissionYear.toString());
  console.log(`Admission Year 20${admissionYear} -> Current Year: ${currentYearNum}`);
}); 