import axios from 'axios';

interface Device {
  id: string;
  name: string;
  feedName: string;
}

interface GetAllDevicesResponse {
  status: string;
  message: string;
  data: Device[];
}

export async function getAllDevices(): Promise<Device[]> {
  try {
    const response = await axios.get<GetAllDevicesResponse>(
      'https://iot-project-y7dx.onrender.com/api/v1/device/get-all'
    );
    console.log('Response:', response.data.data); // Log the response data for debugging
    return response.data.data; // Expected response { status, message, data: [ {id, name, feedName}, ... ] }
  } catch (error: any) {
    throw new Error(
      error.response?.statusText || error.message || 'Error fetching devices'
    );
  }
}