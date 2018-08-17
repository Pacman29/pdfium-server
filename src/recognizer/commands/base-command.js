export default class BaseCommand {
  constructor() {

  }

  async execute() {
    throw new Error('execute method is not override');
  }
}
