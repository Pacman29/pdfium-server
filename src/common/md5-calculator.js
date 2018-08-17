import md5 from 'md5';
import fs from 'fs';

export default class MD5 {
  static fromBuffer(buffer) {
    return md5(buffer);
  }

  static async fromFile(path) {
    let buffer = await fs.readFile(path);
    return this.fromBuffer(buffer);
  }
}
