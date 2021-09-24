const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async createOrder({ quantity }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }

  static async getAllOrders() {
    await sendSms(process.env.ORDER_HANDLER_NUMBER, 'Orders has been got');
    const order = await Order.getAllOrders();
    return order;
  }

  static async getById(id) {
    await sendSms(process.env.ORDER_HANDLER_NUMBER, `Order has been got ${id}`);
    const order = await Order.getById(id);
    return order;
  }

  static async updateOrder(id, quantity) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order has been updated ${id}`
    );
    const order = await Order.updateOrder(id, quantity);
    return order;
  }

  static async deleteOrder(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order has been deleted ${id}`
    );
    const order = await Order.deleteOrder(id);
    return order;
  }
};
