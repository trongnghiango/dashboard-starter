import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/',
  headers: {
    'Content-Type': 'application/json'
  }
});

//add intercepter
// axiosClient.interceptors.response.use(
//   (response) => {
//     // Xử lý response thành công
//     console.log(response.data);
//     return response;
//   },
//   (error) => {
//     // Xử lý lỗi
//     if (error.response.status === 401) {
//       // Ví dụ: làm gì đó khi lỗi 401
//       console.error('Unauthorized access - redirecting to login');
//     }
//     return Promise.reject(error); // Nhớ trả về Promise.reject
//   }
// );

export default axiosClient;
