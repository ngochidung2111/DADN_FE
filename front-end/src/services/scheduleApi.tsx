import axios from "axios";
export async function scheduleDevice(
  device: string,
  schedule: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
    from: string;
    to: string;
  }
): Promise<any> {
    try {
        const response = await axios.post(
          `https://iot-project-y7dx.onrender.com/api/v1/device/${device}/schedule`,
          schedule,
          { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
      } catch (error: any) {
        throw new Error(`Error scheduling device: ${error.response?.statusText || error.message}`);
      }
}