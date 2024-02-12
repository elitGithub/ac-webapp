export class UniqueIdsGenerator {
  private static fakeIP(): string {
    const fakeIP: number[] = [];
    for (let i = 0; i < 4; i++) {
      try {
        fakeIP.push(Math.floor(Math.random() * 256));
      } catch (e) {
        fakeIP.push(1);
      }
    }
    return fakeIP.join('.');
  }

  private static fakePort(): number {
    try {
      return Math.floor(Math.random() * 65536);
    } catch (e) {
      return 1119;
    }
  }

  public static hash(): string {
    if (typeof window === 'undefined') {
      // Running in Node.js
      process.env.PHP_SAPI = 'cli';
      const fakeIP = this.fakeIP();
      const fakePort = this.fakePort();
      process.env.REMOTE_ADDR = fakeIP;
      process.env.REMOTE_PORT = fakePort.toString();
    }

    const requestTime = new Date().getTime() / 1000;
    const remoteAddr = process.env.REMOTE_ADDR || '';
    const remotePort = process.env.REMOTE_PORT || '';
    return Math.abs(
      this.crc32(remoteAddr + requestTime + remotePort + process.hrtime.bigint().toString())
    ).toString(16);
  }

  private static crc32(input: string): number {
    let crc = -1;
    for (let i = 0; i < input.length; i++) {
      crc = (crc >>> 8) ^ this.crcTable[(crc ^ input.charCodeAt(i)) & 0xff];
    }
    return crc ^ -1;
  }

  private static crcTable: number[] = (function () {
    const table: number[] = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) {
        if (c & 1) {
          c = 0xedb88320 ^ (c >>> 1);
        } else {
          c = c >>> 1;
        }
      }
      table[i] = c;
    }
    return table;
  })();

  public static generateTrueRandomString(length: number = 13): string {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomBytes = new Uint8Array(Math.ceil(length / 2));
      window.crypto.getRandomValues(randomBytes);
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(randomBytes[i] % characters.length);
      }
      return result;
    }

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
