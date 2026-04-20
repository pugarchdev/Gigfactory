const API_BASE_URL = 'http://localhost:5000/api';

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

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorMessage = await parseErrorResponse(response);
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

export const projectsApi = {
  list: () => apiRequest('/projects'),
  getStats: () => apiRequest('/projects/count'), // Assuming we might add this or just count the list
};

export const caseStudiesApi = {
  list: () => apiRequest('/case-studies'),
};

export const expertiseApi = {
  list: () => apiRequest('/expertise'),
};

export const recruitmentApi = {
  submitAgency: (payload) => apiRequest('/recruitment/agency', { method: 'POST', body: JSON.stringify(payload) }),
  submitFreelancer: (payload) => apiRequest('/recruitment/freelancer', { method: 'POST', body: JSON.stringify(payload) }),
};

export const gigExpertApi = {
  submitFeedback: (payload) => apiRequest('/app/gigexpert', { method: 'POST', body: JSON.stringify(payload) }),
};

export const enquiryApi = {
  send: (payload) => apiRequest('/enquiries/enquiry', { method: 'POST', body: JSON.stringify(payload) }),
};
