/**
 * API Client for No Dry Starts
 * Handles all API calls to the Django backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Manufacturer {
  id: string;
  name: string;
  description: string;
  address?: string;
  phone: string;
  email: string;
  website?: string;
  active?: boolean;
  created_at?: string;
}

export interface Document {
  id: string;
  file_name: string;
  file?: string;
  file_url?: string;
  category: 'patent' | 'diagram' | 'investor' | 'technical' | 'other';
  description?: string;
  created_at?: string;
}

export interface Lead {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  message: string;
  inquiry_type: 'contact' | 'investor' | 'manufacturer' | 'rfq';
  created_at?: string;
}

export interface RFQSubmission {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  attachment?: File;
  attachment_url?: string;
  created_at?: string;
}

export interface ContentBlock {
  id: string;
  slug: string;
  title: string;
  html_content: string;
  order: number;
  page: string;
  is_active?: boolean;
  updated_at?: string;
  created_at?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing: boolean = false;
  private refreshPromise: Promise<string> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.refreshToken = localStorage.getItem('refreshToken');
    }
  }

  setToken(token: string) {
    // Strip any whitespace from token
    const cleanToken = token?.trim() || '';
    this.token = cleanToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', cleanToken);
      console.log('Token stored in localStorage:', {
        tokenLength: cleanToken.length,
        tokenPreview: cleanToken.substring(0, 50),
        retrieved: localStorage.getItem('token')?.substring(0, 50),
      });
    }
  }

  setRefreshToken(token: string) {
    const cleanToken = token?.trim() || '';
    this.refreshToken = cleanToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', cleanToken);
    }
  }

  clearToken() {
    this.token = null;
    this.refreshToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  private async performTokenRefresh(): Promise<string> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: this.refreshToken }),
        credentials: 'include',
      });

      if (!response.ok) {
        // Refresh token is invalid, need to re-login
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        throw new Error('Refresh token expired. Please login again.');
      }

      const data = await response.json();
      const newToken = data.access?.trim() || '';
      this.setToken(newToken);
      console.log('Token refreshed successfully');
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    // Always read token from localStorage on each request to ensure fresh token
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    // Strip any whitespace that might have been added
    token = token?.trim() || null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      // Debug: log token info for problematic endpoints
      if (endpoint.includes('/manufacturers/') && !endpoint.includes('/api/')) {
        console.log('Sending request with token:', {
          endpoint,
          tokenLength: token.length,
          tokenPreview: token.substring(0, 50),
          authHeader: headers['Authorization']?.substring(0, 80),
        });
      }
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Handle 401 Unauthorized - try to refresh token
    if (response.status === 401 && endpoint !== '/token/' && endpoint !== '/token/refresh/') {
      console.log('Got 401, attempting token refresh...');
      
      try {
        // If already refreshing, wait for that promise
        if (this.isRefreshing) {
          await this.refreshPromise;
        } else {
          this.isRefreshing = true;
          this.refreshPromise = this.performTokenRefresh();
          await this.refreshPromise;
          this.isRefreshing = false;
          this.refreshPromise = null;
        }

        // Retry the original request with new token
        const newToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const newHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          ...(options.headers as Record<string, string> || {}),
        };
        if (newToken) {
          newHeaders['Authorization'] = `Bearer ${newToken.trim()}`;
        }

        const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          headers: newHeaders,
          credentials: 'include',
        });

        if (!retryResponse.ok) {
          const error = await retryResponse.json().catch(() => ({ detail: 'An error occurred' }));
          throw new Error(error.detail || `HTTP error! status: ${retryResponse.status}`);
        }

        return retryResponse.json();
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw refreshError;
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(username: string, password: string) {
    const data = await this.request<{ access: string; refresh: string }>('/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.setToken(data.access);
    this.setRefreshToken(data.refresh);
    return data;
  }

  // Manufacturers
  async getManufacturers(): Promise<Manufacturer[]> {
    const data = await this.request<{ results: Manufacturer[] }>('/manufacturers/');
    return data.results || [];
  }

  async getManufacturer(id: string): Promise<Manufacturer> {
    return this.request(`/manufacturers/${id}/`);
  }

  async createManufacturer(data: Partial<Manufacturer>): Promise<Manufacturer> {
    return this.request('/manufacturers/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateManufacturer(id: string, data: Partial<Manufacturer>): Promise<Manufacturer> {
    return this.request(`/manufacturers/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteManufacturer(id: string): Promise<void> {
    return this.request(`/manufacturers/${id}/`, {
      method: 'DELETE',
    });
  }

  // Documents
  async getDocuments(category?: string): Promise<Document[]> {
    const query = category ? `?category=${category}` : '';
    const data = await this.request<{ results: Document[] }>(`/documents/${query}`);
    return data.results || [];
  }

  async getDocument(id: string): Promise<Document> {
    return this.request(`/documents/${id}/`);
  }

  async uploadDocument(formData: FormData): Promise<Document> {
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/documents/`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async deleteDocument(id: string): Promise<void> {
    return this.request(`/documents/${id}/`, {
      method: 'DELETE',
    });
  }

  async createDocument(data: { file_name: string; file_type: string; description?: string }): Promise<Document> {
    return this.request('/documents/', {
      method: 'POST',
      body: JSON.stringify({
        file_name: data.file_name,
        category: data.file_type,
        description: data.description,
        file: `/static/documents/${data.file_name}`  // Placeholder for now
      }),
    });
  }

  async updateDocument(id: string, data: { file_name: string; file_type: string; description?: string }): Promise<Document> {
    return this.request(`/documents/${id}/`, {
      method: 'PUT',
      body: JSON.stringify({
        file_name: data.file_name,
        category: data.file_type,
        description: data.description,
      }),
    });
  }

  // Leads
  async createLead(data: Lead): Promise<Lead> {
    return this.request('/leads/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLeads(): Promise<Lead[]> {
    const data = await this.request<{ results: Lead[] }>('/leads/');
    return data.results || [];
  }

  // RFQ Submissions
  async createRFQ(data: Omit<RFQSubmission, 'id' | 'attachment_url' | 'created_at'>): Promise<RFQSubmission> {
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    if (data.company) formData.append('company', data.company);
    formData.append('message', data.message);
    if (data.attachment) formData.append('attachment', data.attachment);

    const response = await fetch(`${this.baseUrl}/rfq/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getRFQSubmissions(): Promise<RFQSubmission[]> {
    const data = await this.request<{ results: RFQSubmission[] }>('/rfq/');
    return data.results || [];
  }

  // CSV Export
  async exportLeadsCSV(): Promise<Blob> {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    token = token?.trim() || null;
    const response = await fetch(`${this.baseUrl}/leads/export_csv/`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }

  async exportRFQsCSV(): Promise<Blob> {
    let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    token = token?.trim() || null;
    const response = await fetch(`${this.baseUrl}/rfq/export_csv/`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }

  // Content Blocks
  async getContentBlocks(): Promise<ContentBlock[]> {
    const data = await this.request<{ results: ContentBlock[] }>('/content/');
    return data.results || [];
  }

  async getContentBlock(slug: string): Promise<ContentBlock> {
    return this.request(`/content/${slug}/`);
  }

  async updateContentBlock(slug: string, data: Partial<ContentBlock>): Promise<ContentBlock> {
    return this.request(`/content/${slug}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async createContentBlock(data: { slug: string; title: string; html_content: string }): Promise<ContentBlock> {
    return this.request('/content/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteContentBlock(slug: string): Promise<void> {
    return this.request(`/content/${slug}/`, {
      method: 'DELETE',
    });
  }

  async reorderContentBlocks(blocks: Array<{ slug: string; order: number }>): Promise<{ message: string; updated_count: number }> {
    return this.request('/content/reorder/', {
      method: 'POST',
      body: JSON.stringify({ blocks }),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
