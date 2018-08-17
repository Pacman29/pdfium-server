import BaseCommand from './base-command';
import fs from 'fs';

export default class SaveFileCommand extends BaseCommand {
  constructor(filePath, File) {
    super();
    this.File = File;
    this.filePath = filePath;
  }


  execute() {
    return new Promise((resolve, reject) => {
      console.log('write file');
      fs.writeFile(this.filePath, this.File, (err) => {
        console.log('writed file');
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
