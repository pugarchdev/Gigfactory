/**
 * Comprehensive input and regex validators for the Career application form
 */

export const REGEX = {
  // Letters, spaces, apostrophes, hyphens, and periods (2 to 60 chars)
  NAME: /^[a-zA-Z\s.'-]{2,60}$/,
  // Standard RFC-compliant email regex
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // Phone numbers with optional +, brackets, hyphens, and spaces
  PHONE: /^\+?[0-9\s\-()]{7,20}$/,
  // Web URLs with or without http(s)://
  URL: /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i,
};

export const ALLOWED_CV_EXTENSIONS = ['pdf', 'doc', 'docx'];
export const MAX_CV_SIZE = 10 * 1024 * 1024; // 10MB

export const INTERESTED_IN_OPTIONS = [
  'BIM / Modelling',
  'Project Planning & control',
  'BOQ / Audit',
  'BD & Marketing',
  'Auto CAD',
  'Other',
];

/**
 * Validates a single form field and returns an error message or empty string
 */
export function validateField(name, value, file = null) {
  switch (name) {
    case 'fullName': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Full name is required.';
      if (trimmed.length < 2) return 'Full name must be at least 2 characters.';
      if (!REGEX.NAME.test(trimmed)) {
        return 'Only letters, spaces, hyphens, and dots are allowed.';
      }
      return '';
    }

    case 'email': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Email address is required.';
      if (!REGEX.EMAIL.test(trimmed)) {
        return 'Please enter a valid email address (e.g. john@example.com).';
      }
      return '';
    }

    case 'phone': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Phone number is required.';
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15 || !REGEX.PHONE.test(trimmed)) {
        return 'Please enter a valid phone number (7-15 digits, e.g. +1 555 123 4567).';
      }
      return '';
    }

    case 'interestedIn': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Please select an area of interest.';
      const isValid = INTERESTED_IN_OPTIONS.some(
        (opt) => opt.toLowerCase() === trimmed.toLowerCase()
      );
      if (!isValid) return 'Please select a valid interest option.';
      return '';
    }

    case 'otherInterestedIn': {
      const trimmed = (value || '').trim();
      if (!trimmed) return 'Please specify your area of interest.';
      if (trimmed.length < 2) return 'Must be at least 2 characters.';
      return '';
    }

    case 'portfolio': {
      const trimmed = (value || '').trim();
      if (!trimmed) return ''; // Optional
      if (!REGEX.URL.test(trimmed)) {
        return 'Please enter a valid portfolio link (e.g. https://myportfolio.com or myportfolio.com).';
      }
      return '';
    }

    case 'cv': {
      if (!file) return 'Please upload your CV / Resume (.pdf, .doc, .docx).';
      const ext = file.name?.split('.').pop()?.toLowerCase();
      if (!ALLOWED_CV_EXTENSIONS.includes(ext)) {
        return 'Only PDF, DOC, and DOCX files are accepted.';
      }
      if (file.size > MAX_CV_SIZE) {
        return 'File size exceeds maximum limit of 10MB.';
      }
      return '';
    }

    case 'coverLetter': {
      return '';
    }

    default:
      return '';
  }
}

/**
 * Validates the entire form and returns an errors object
 */
export function validateAll(formData, cvFile) {
  const errors = {};
  const fields = ['fullName', 'email', 'phone', 'interestedIn', 'portfolio'];

  for (const field of fields) {
    const error = validateField(field, formData[field]);
    if (error) errors[field] = error;
  }

  if (formData.interestedIn?.toLowerCase() === 'other') {
    const otherError = validateField('otherInterestedIn', formData.otherInterestedIn);
    if (otherError) errors.otherInterestedIn = otherError;
  }

  const cvError = validateField('cv', null, cvFile);
  if (cvError) errors.cv = cvError;

  return errors;
}
