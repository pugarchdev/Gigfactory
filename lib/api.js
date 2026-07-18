const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    cache: 'no-store', // Disable caching for all requests
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
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await apiRequest(`/projects${query ? `?${query}` : ''}`);
    return data || [];
  },
  getStats: () => apiRequest('/projects/count'),
};

export const mediaApi = {
  list: async (params = {}) => {
    const query = new URLSearchParams({ status: 'published', ...params }).toString();
    const data = await apiRequest(`/media${query ? `?${query}` : ''}`);
    return data || [];
  },
  getById: (idOrSlug) => apiRequest(`/media/${idOrSlug}`),
};

export const caseStudiesApi = {
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await apiRequest(`/case-studies${query ? `?${query}` : ''}`);
    if (Object.keys(params).length === 0) {
      return Array.isArray(data) ? [...data].reverse() : data;
    }
    return data || [];
  },
};

export const faqApi = {
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const data = await apiRequest(`/faq${query ? `?${query}` : ''}`);
    return data || [];
  },
};

export const expertiseApi = {
  list: () => apiRequest('/expertise'),
};

export const youtubeVideosApi = {
  list: () => apiRequest('/youtube-videos'),
};

export const recruitmentApi = {
  submitAgency: (payload) => apiRequest('/recruitment/agency', { method: 'POST', body: JSON.stringify(payload) }),
  submitGigExpert: (payload) => apiRequest('/recruitment/gig-expert', { method: 'POST', body: JSON.stringify(payload) }),
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      // Note: We don't set Content-Type header here because fetch sets it automatically with the correct boundary for FormData
    });
    if (!response.ok) {
      const errorMessage = await parseErrorResponse(response);
      throw new Error(errorMessage);
    }
    return response.json();
  },
};

export const gigExpertApi = {
  submitFeedback: (payload) => apiRequest('/app/gigexpert', { method: 'POST', body: JSON.stringify(payload) }),
};

export const enquiryApi = {
  send: (payload) => apiRequest('/enquiries/enquiry', { method: 'POST', body: JSON.stringify(payload) }),
};
