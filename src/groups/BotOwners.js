const patron = require('patron.js');

class BotOwners extends patron.Group {
  constructor() {
    super({
      name: 'botowners',
      description: 'These commands may only be used by the owners of RealiLife.',
      preconditions: ['botowner']
    });
  }
}

module.exports = new BotOwners();
