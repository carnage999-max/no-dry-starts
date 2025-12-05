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
  updated_at?: string;
  created_at?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
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

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

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
    return data;
  }

  async refreshToken(refreshToken: string) {
    const data = await this.request<{ access: string }>('/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
    this.setToken(data.access);
    return data;
  }

  // Manufacturers
  async getManufacturers(): Promise<Manufacturer[]> {
    return this.request('/manufacturers/');
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
    return this.request(`/documents/${query}`);
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

  // Leads
  async createLead(data: Lead): Promise<Lead> {
    return this.request('/leads/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLeads(): Promise<Lead[]> {
    return this.request('/leads/');
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
    return this.request('/rfq/');
  }

  // Content Blocks
  async getContentBlocks(): Promise<ContentBlock[]> {
    return this.request('/content/');
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
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
