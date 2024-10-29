const request = require('supertest');
const app = require('../service');

let testUserAuthToken, testUser, testUserID, admin;

beforeAll(async () => {
  admin = await createAdminUser();
  testUser = { name: admin.name, email: admin.email, password: admin.password };
  const loginRes = await request(app).put('/api/auth').send(testUser);
  testUserAuthToken = loginRes.body.token;
  testUserID = loginRes.body.user.id;
});

test('Get Franchises', async () => {
    const getFranchisesRes = await request(app).get('/api/franchise').send(testUser);
    expect(getFranchisesRes.status).toBe(200);
});

test('Get User Franchises', async() => {
    const getUserFranchisesRes = await request(app).get('/api/franchise/' + testUserID).set('Authorization', 'Bearer ' + testUserAuthToken);
    expect(getUserFranchisesRes.status).toBe(200);
});


function expectValidJwt(potentialJwt) {
    expect(potentialJwt).toMatch(/^[a-zA-Z0-9\-_]*\.[a-zA-Z0-9\-_]*\.[a-zA-Z0-9\-_]*$/);
  }
  
  function randomName() {
      return Math.random().toString(36).substring(2, 12);
  }
  
  const { Role, DB } = require('../database/database.js');
  
  async function createAdminUser() {
    let user = { password: 'toomanysecrets', roles: [{ role: Role.Admin }] };
    user.name = randomName();
    user.email = user.name + '@admin.com';
  
    user = await DB.addUser(user);
    return { ...user, password: 'toomanysecrets' };
  }