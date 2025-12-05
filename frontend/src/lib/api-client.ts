// API client utility for making HTTP requests to NestJS backend
// Follows RESTful principles with consistent response formats

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface RequestOptions extends RequestInit {
  token?: string
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`,
        statusCode: response.status,
      }))
      throw error
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw {
        message: error.message,
        statusCode: 500,
      }
    }
    throw error
  }
}

export function get<T>(endpoint: string, token?: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
    token,
  })
}

export function post<T>(
  endpoint: string,
  body: unknown,
  token?: string
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    token,
  })
}

export function put<T>(
  endpoint: string,
  body: unknown,
  token?: string
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    token,
  })
}

export function del<T>(endpoint: string, token?: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
    token,
  })
}

