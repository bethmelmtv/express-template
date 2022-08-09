const request = require('supertest');
const { setupDb } = require('./utils.js'); //what does this line do
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Item = require('../lib/models/Item');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '123456',
};
const mockUser2 = {
  firstName: 'Beth',
  lastName: 'Mel',
  email: 'bethmel@example.com',
  password: '654321',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);
  console.log(agent, 'AGENT');

  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;

  await (await agent.post('/api/v1/users/sessions')).send({ email, password });
  return [agent, user];
  // why are we returning agent and user?
};

describe('items', () => {
  beforeEach(setupDb);

  it('POST /api/v1/items creates a new shopping item with the current user', async () => {
    const [agent, user] = await registerAndLogin();
    const newItem = { description: 'eggs', qty: 12 };
    const resp = await agent.post('/api/v1/items').send(newItem);
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      description: newItem.description,
      qty: newItem.qty,
      user_id: user.id,
      bought: false,
    });
  });
});
