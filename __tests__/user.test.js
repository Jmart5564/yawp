const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const testUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@email.com',
  password: 'password',
};
const agent = request.agent(app);

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should create a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(testUser);
    const { firstName, lastName, email } = testUser;

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('should sign in a user', async () => {

    await agent.post('/api/v1/users').send(testUser);
    const res = await agent.post('/api/v1/users/sessions').send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Signed in successfully!');
  });
  
  it('should give a 401 error if no user signed in tries to view list of users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.status).toBe(401);
  });
  it('should give a 403 error for unauthorized users viewing list of users', async () => {
    await agent.post('/api/v1/users').send(testUser);
    const res = await agent.get('/api/v1/users');
    expect(res.status).toBe(403);
  });
  it('should get list of users if user is admin', async () => {
    const adminUser = {
      firstName: 'Auth',
      lastName: 'Official',
      email: 'imanadmin@admin.com',
      password: 'Authorized',
    };
    await agent.post('/api/v1/users').send(adminUser);
    await agent.post('/api/v1/users/sessions').send(adminUser);
    const res = await agent.get('/api/v1/users');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
    });
  });

  it('should return a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      cuisine: expect.any(String),
      city: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
