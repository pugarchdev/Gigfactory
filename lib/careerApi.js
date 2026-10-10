/**
 * Career Application API Service
 * Connects official website career submissions to the internal platform backend
 */

const PLATFORM_API_URL =
  process.env.NEXT_PUBLIC_PLATFORM_API_URL || 'http://localhost:5000/api';

async function parseErrorResponse(response) {
  const fallback = `Request failed with status ${response.status}`;
  try {
    const errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      return errorJson.message || errorJson.error || errorText || fallback;
    } catch {
      return errorText || fallback;
    }
  } catch {
    return fallback;
  }
}

/**
 * Submit full-time career application with resume file and candidate details
 * @param {FormData} formData
 */
export async function submitCareerApplication(formData) {
  const baseUrl = PLATFORM_API_URL.replace(/\/+$/, '');
  const url = `${baseUrl}/fulltime-requests`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    // Note: Do not set Content-Type header when sending FormData,
    // the browser sets it automatically with the multipart boundary
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  return response.json();
}
