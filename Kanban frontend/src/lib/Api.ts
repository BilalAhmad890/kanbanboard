// utils/api.ts

const BASE_URL = 'http://localhost:5209/api';

interface FetcherOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  credentials?: RequestCredentials;
}

const fetcher = async <T>(url: string, options: FetcherOptions = {}): Promise<T> => {
  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong!');
  }
  return response.json();
};

// GET request
export const get = <T>(url: string): Promise<T> => {
  return fetcher<T>(url, {
      credentials: "include",
  });
};

// POST request
export const post = async <T, R>(url: string, data: T): Promise<R> => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json(); 
    console.error('Error response:', error);

    throw error;  
  }

  return response.json();
};


// PUT request
export const put = <T>(url: string, data: T): Promise<T> => {
  return fetcher<T>(url, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// DELETE request
export const del = <T>(url: string): Promise<T> => {
  return fetcher<T>(url, {
    method: 'DELETE',
    credentials: "include",
  });
};

