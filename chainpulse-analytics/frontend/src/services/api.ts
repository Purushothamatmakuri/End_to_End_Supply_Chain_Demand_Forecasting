const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface ForecastRequest {
  category: string;
  market: string;
  region: string;
  shipping_mode: string;
}

export interface PredictionRequest {
  benefit_per_order: number;
  product_price: number;
  order_item_quantity: number;
  delivery_delay: number;
  profit_margin: number;
}

class APIError extends Error {
  constructor(public message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 1): Promise<any> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new APIError(`HTTP error! status: ${response.status}`, response.status);
    }

    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Request failed, retrying... (${retries} attempts left)`);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export const api = {
  async getForecast(data: ForecastRequest) {
    return fetchWithRetry(`${API_URL}/api/forecast`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getPrediction(data: PredictionRequest) {
    return fetchWithRetry(`${API_URL}/api/predict`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
};
