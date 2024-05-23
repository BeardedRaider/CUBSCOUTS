import axios from 'axios';

const getUser = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Pass the token as an authorization header
            }
        });
        if (response.status && response.data) {
            return response.data;
        } else {
            console.error('Invalid response from the server:', response);
        }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        
};

export default getUser;