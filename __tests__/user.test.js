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
  afterAll(() => {
    pool.end();
  });
});
