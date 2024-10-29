const request = require('supertest');
const app = require('../service');

const testUser = { name: 'pizza diner', email: 'reg@test.com', password: 'a' };
let testUserAuthToken, testUserId;

beforeAll(async () => {
  testUser.name = randomName();
  testUser.email = Math.random().toString(36).substring(2, 12) + '@test.com';
  const registerRes = await request(app).post('/api/auth').send(testUser);
  testUserAuthToken = registerRes.body.token;
  testUserId = registerRes.body.user.id;
  expectValidJwt(testUserAuthToken);
});

test('login', async () => {
  const loginRes = await request(app).put('/api/auth').send(testUser);
  expect(loginRes.status).toBe(200);
  expectValidJwt(loginRes.body.token);

  const expectedUser = { ...testUser, roles: [{ role: 'diner' }] };
  delete expectedUser.password;
  expect(loginRes.body.user).toMatchObject(expectedUser);
});

test('update user', async () => {
  testUser.email = randomName() + '@test.com';
  const updateUserRes = await request(app).put('/api/auth/' + testUserId).set('Authorization', 'Bearer ' + testUserAuthToken).send(testUser);
  expect(updateUserRes.status).toBe(200);
})

test('logout', async () => {
    const logoutRes = await request(app).delete('/api/auth/').set('Authorization', 'Bearer ' + testUserAuthToken);
    expect(logoutRes.status).toBe(200);
})

test('bad logout', async () => {
    const logoutRes = await request(app).delete('/api/auth/').set('Authorization', 'Bearer badtoken');
    expect(logoutRes.status).toBe(401);
})

function expectValidJwt(potentialJwt) {
  expect(potentialJwt).toMatch(/^[a-zA-Z0-9\-_]*\.[a-zA-Z0-9\-_]*\.[a-zA-Z0-9\-_]*$/);
}

function randomName() {
    return Math.random().toString(36).substring(2, 12);
}
