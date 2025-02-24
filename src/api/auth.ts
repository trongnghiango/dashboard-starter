import { User } from '../routes/protected-route';

const user: User = {
  id: 1000,
  name: 'ABC',
  role: 'admin'
};
export async function getUser(): Promise<any> {
  //handle
  // if (!token) return [400, {}];
  // gia lap thoi gian de thuc hien xong 1 request
  await new Promise((resolve) => setTimeout(resolve, 2000)); // waiting 1000ms

  const authToken = generateAuthToken();

  return [200, { authToken, user }] as const;
}

function generateAuthToken() {
  //handle
  return Math.random().toString(36).substring(2);
}

export async function login() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const authToken = generateAuthToken();

  return [200, { authToken, user }] as const;
}
