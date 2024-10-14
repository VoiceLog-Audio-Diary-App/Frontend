import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const refreshAccessToken = async () => {
  try {
    const email = await EncryptedStorage.getItem('email');

    const response = await axios.post('http://192.168.45.77:8080/auth/refresh-accesstoken', {
      email: email,
    });

    if (response.status === 200) {
      const { newAccessToken } = response.data;
      await EncryptedStorage.setItem('accessToken', newAccessToken);
      return true;
    }
  } catch (error) {
    return false;
  }
};
