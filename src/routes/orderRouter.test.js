const request = require('supertest');
const app = require('../service');

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

test('Get Menu', async () => {
    const getMenuRes = await request(app).get('/api/order/menu');
    console.log(getMenuRes.body)
    expect(getMenuRes.status).toBe(200);
});

test('Add Menu Item', async () => {
    const addMenuItemRes = await request(app).put('/api/order/menu').set('Authorization', 'Bearer ' + testUserAuthToken).send({title: randomName(), description: 'test description', image: 'test.png', price: 5,});
    expect(addMenuItemRes.status).toBe(200);
});

test('Get Orders', async() => {
    const getOrdersRes = await request(app).get('/api/order').set('Authorization', 'Bearer ' + testUserAuthToken);
    expect(getOrdersRes.status).toBe(200);
})


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