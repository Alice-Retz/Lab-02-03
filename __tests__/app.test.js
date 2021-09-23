const pool = require('../lib/utils/pool');
const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('should return all orders', async () => {
    const order = await Order.insert({ quantity: 10 });
    console.log('order in get all', order);
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([order]);
      });
  });

  it('should return all orders', async () => {
    const order = await Order.insert({ quantity: 10 });
    return request(app)
      .get(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).toEqual([order]);
      });
  });

  it('should update an order by id', async () => {
    const order = await Order.insert({ quantity: 10 });
    return request(app)
      .get(`/api/v1/orders/${order.id}`)
      .send({ quantity: 20 })
      .then((res) => {
        expect(res.body).toEqual({ id: 1, quantity: 20 });
      });
  });

  it('should delete an order', async () => {
    const order = await Order.insert({ quantity: 10 });
    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .then((res) => {
        expect(res.body).not.toEqual(order);
      });
  });
});
