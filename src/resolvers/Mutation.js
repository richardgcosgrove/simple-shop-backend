const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, context, info) {
    // TODO: Check if they are logged in

    const item = await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    return item;
  },

  updateItem(parent, args, context, info) {
    // take copy of update arguments
    const updates = {...args};
    // remove the ID from updates
    delete updates.id;
    // run the update method
    return context.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id,
      }
    }, info);
  },

  async deleteItem(parent, args, context, info) {
    const where = { id: args.id };
    // find item
    const item = await context.db.query.item({where}, `{id title}`);
    // check permissions or owernship
    // TODO
    // delete item
    return await context.db.mutation.deleteItem({where}, info);
  },
};

module.exports = Mutations;
