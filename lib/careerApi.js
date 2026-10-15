/**
 * Career Application API Service
 * Connects official website career submissions to the internal platform backend
 */

const PLATFORM_API_URL =
  process.env.NEXT_PUBLIC_PLATFORM_API_URL || 'http://localhost:5000/api';

/**
 * Submit full-time career application with resume file and candidate details
 * @param {FormData} formData
 */
export async function submitCareerApplication(formData) {
  let baseUrl = PLATFORM_API_URL.replace(/\/+$/, '');
  if (baseUrl.includes('localhost') && baseUrl.startsWith('https:///')) {
    baseUrl = baseUrl.replace('https:///', 'http://');
  }

  const url = `${baseUrl}/fulltime-requests`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let field = null;

    try {
      const errorJson = await response.json();
      errorMessage = errorJson.message || errorJson.error || errorMessage;
      field = errorJson.field || null;
    } catch {
      try {
        const errorText = await response.text();
        if (errorText) errorMessage = errorText;
      } catch {
        // fallback
      }
    }

    const error = new Error(errorMessage);
    error.field = field;
    throw error;
  }

  return response.json();
}
