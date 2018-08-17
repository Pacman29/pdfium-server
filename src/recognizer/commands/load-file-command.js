import BaseCommand from './base-command';
import fs from 'fs';

export default class LoadFileCommand extends BaseCommand {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  execute() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'byte64', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
