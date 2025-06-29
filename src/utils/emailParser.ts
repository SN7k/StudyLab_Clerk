export interface ParsedEmailData {
  studentId: string;
  program: string;
  year: string;
  fullName?: string;
  isValid: boolean;
}

export function parseUniversityEmail(email: string): ParsedEmailData {
  // Default invalid response
  const defaultResponse: ParsedEmailData = {
    studentId: '',
    program: '',
    year: '',
    isValid: false
  };

  try {
    // Check if it's a valid university email
    if (!email.includes('@brainwareuniversity.ac.in')) {
      return defaultResponse;
    }

    // Extract the part before @
    const localPart = email.split('@')[0];
    
    // Expected format: bwubca23734 (bwu + program + year + studentId)
    if (localPart.length < 8) {
      return defaultResponse;
    }

    // Check if it starts with 'bwu'
    if (!localPart.toLowerCase().startsWith('bwu')) {
      return defaultResponse;
    }

    let program = '';
    let year = '';
    let studentId = '';

    // Try to extract program (BCA, MCA, BTECH, MTECH)
    const possiblePrograms = ['bca', 'mca', 'btech', 'mtech'];
    
    for (const prog of possiblePrograms) {
      if (localPart.toLowerCase().includes(prog)) {
        program = prog.toUpperCase();
        const programIndex = localPart.toLowerCase().indexOf(prog);
        
        // Extract year (2 digits after program)
        const yearStart = programIndex + prog.length;
        if (yearStart + 2 <= localPart.length) {
          year = localPart.substring(yearStart, yearStart + 2);
          
          // Extract student ID (remaining digits)
          const studentIdStart = yearStart + 2;
          if (studentIdStart < localPart.length) {
            studentId = localPart.substring(studentIdStart);
          }
        }
        break;
      }
    }

    // Validate extracted data
    if (program && year && studentId && !isNaN(parseInt(year))) {
      // Additional validation for year (should be reasonable)
      const yearNum = parseInt(year);
      const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
      
      // Year should be between current year - 10 and current year + 1
      if (yearNum >= currentYear - 10 && yearNum <= currentYear + 1) {
        return {
          studentId,
          program,
          year,
          isValid: true
        };
      }
    }

    return defaultResponse;
  } catch (error) {
    console.error('Error parsing university email:', error);
    return defaultResponse;
  }
}

// Helper function to get current academic year
export function getCurrentAcademicYear(): string {
  const currentYear = new Date().getFullYear();
  return currentYear.toString().slice(-2); // Get last 2 digits
}

// Helper function to calculate student's current year based on admission year
export function calculateCurrentYear(admissionYear: string): number {
  const currentYear = parseInt(getCurrentAcademicYear());
  const admissionYearNum = parseInt(admissionYear);
  
  if (isNaN(admissionYearNum) || isNaN(currentYear)) {
    return 1; // Default to first year if parsing fails
  }
  
  const yearDifference = currentYear - admissionYearNum;
  
  // Ensure year is between 1 and 4
  if (yearDifference < 0) return 1;
  if (yearDifference > 3) return 4; // Max 4 years for any program
  
  return yearDifference + 1; // +1 because first year starts at 1, not 0
}

// Helper function to get program full name
export function getProgramFullName(programCode: string): string {
  const programMap: { [key: string]: string } = {
    'BCA': 'Bachelor of Computer Applications',
    'MCA': 'Master of Computer Applications',
    'BTECH': 'Bachelor of Technology',
    'MTECH': 'Master of Technology'
  };
  
  return programMap[programCode] || programCode;
}

// Helper function to get student name from email (placeholder for future enhancement)
export function getStudentNameFromEmail(email: string): string {
  const parsed = parseUniversityEmail(email);
  if (parsed.isValid) {
    return `Student ${parsed.studentId}`;
  }
  return 'Student';
} 