const request = require('supertest');
const app = require('../service');

let testUserAuthToken, testUser, testUserID, admin;

beforeAll(async () => {
  testUser = await createAdminUser();
  const loginRes = await request(app).put('/api/auth').send(testUser);
  testUserAuthToken = loginRes.body.token;
  testUserID = loginRes.body.user.id;
});

afterAll(async () => {
    const connection = await DB.getConnection();
    connection.end();
});

test('Get Franchises', async () => {
    const getFranchisesRes = await request(app).get('/api/franchise').send(testUser);
    expect(getFranchisesRes.status).toBe(200);
});

test('Get User Franchises', async() => {
    const getUserFranchisesRes = await request(app).get('/api/franchise/' + testUserID).set('Authorization', 'Bearer ' + testUserAuthToken);
    expect(getUserFranchisesRes.status).toBe(200);
});

test('Create Franchise', async() => {
    const createFranchiseRes = await request(app).post('/api/franchise').set('Authorization', 'Bearer ' + testUserAuthToken).send({name: randomName(), admins: [{email: testUser.email}]});
    expect(createFranchiseRes.status).toBe(200);
});

test('Delete Franchise', async() => {
    const franchiseName = randomName();
    const createFranchiseRes = await request(app).post('/api/franchise').set('Authorization', 'Bearer ' + testUserAuthToken).send({name: franchiseName, admins: [{email: testUser.email}]});
    const deleteFranchiseRes = await request(app).delete('/api/franchise/' + createFranchiseRes.body.id).set('Authorization', 'Bearer ' + testUserAuthToken);
    expect(deleteFranchiseRes.status).toBe(200);
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