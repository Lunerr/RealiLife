const patron = require('patron.js');
const db = require('../../database');
const NumberUtil = require('../../utility/NumberUtil.js');
const Random = require('../../utility/Random.js');
const Constants = require('../../utility/Constants.js');

class Rape extends patron.Command {
  constructor() {
    super({
      names: ['rape'],
      groupName: 'crime',
      description: 'Rape any user.',
      cooldown: Constants.config.rape.cooldown,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Vanalk#1231',
          preconditions: ['noself']
        })
      ]
    });
  }

  async run(msg, args) {
    const roll = Random.roll();
    
    if (roll < Constants.config.rape.odds) {
      const cost = msg.dbUser.cash * Constants.config.rape.cost;
      await db.userRepo.modifyCash(msg.dbGuild, msg.member, -cost);
      
      await msg.createReply('MAYDAY MY NIGGA! **MAYDAY!** ' + args.member.user.tag.boldify() + ' counter-raped you, forcing you to spend ' + NumberUtil.format(cost) + ' on rectal repairs.');
    } else {
      const dbUser = await db.userRepo.getUser(args.member.id, msg.guild.id);
      const cost = dbUser.cash * Constants.config.rape.cost;
      const costStr = NumberUtil.format(dbUser.cash);
      
      await db.userRepo.modifyCash(msg.dbGuild, args.member, -cost);
      await args.member.user.tryDM('Listen here bucko, ' + msg.author.tag.boldify() + ' just raped your fucking asshole and forced you to spend ' + costStr  + ' on rectal repairs.');
      await msg.createReply('You raped his **GODDAMN ASSHOLE** :joy:! ' + args.member.user.tag.boldify() + ' needed to spend ' + costStr + ' just to get his anus working again!');
    }
  }
}

module.exports = new Rape();
