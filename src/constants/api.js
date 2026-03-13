// Base URL for the backend API (no trailing slash).
// In dev we use /api so Vite proxies to alw.checkour.work and avoids CORS.
export const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://alw.checkour.work";

// Hard-coded auth token used for API requests.
// Update this value when the backend issues a new token.
export const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNiwicm9sZSI6Ik1hbmFnZXIiLCJkZXBhcnRtZW50IjoiTWFya2V0aW5nIiwiZXhwIjoxNzczNDc0NzY0LCJpYXQiOjE3NzMzODgzNjQsInRva2VuIjpudWxsfQ.6fyHsGXiXlnNG2fOe6QwhF0_IATT0YZL8_ZnSu24aLo';

