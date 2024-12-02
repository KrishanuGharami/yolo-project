import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  async processFrame(facilityId: string, cameraId: string, frameData: Blob) {
    const formData = new FormData();
    formData.append('frame', frameData);

    const response = await axios.post(
      `${API_BASE_URL}/process-frame?facility_id=${facilityId}&camera_id=${cameraId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async getAlerts(facilityId?: string, hours: number = 24) {
    const params = new URLSearchParams();
    if (facilityId) params.append('facility_id', facilityId);
    params.append('hours', hours.toString());

    const response = await axios.get(`${API_BASE_URL}/alerts?${params}`);
    return response.data;
  },
};