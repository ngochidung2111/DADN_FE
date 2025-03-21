import axios from 'axios';

const API_URL = 'https://iot-project-y7dx.onrender.com/api/v1/device/toggle/set-emotor';

interface ToggleLightResponse {
    message: string;
    data: number;
}

export const toggleMotor = async () => {
    try {
        const response = await axios.post<ToggleLightResponse>(API_URL);
        
        console.log('Toggle motor:', response.data.message);
        return response.data;
    } catch (error) {
        console.error('Error toggling motor:', error);
        throw error;
    }
};