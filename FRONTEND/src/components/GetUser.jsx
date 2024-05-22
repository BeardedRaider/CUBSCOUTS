import axios from 'axios';

const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/allusers');
        if (response && response.data) {
        return response.data;
        } else {
        console.error('Invalid response from the server:', response);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

export default getUser;