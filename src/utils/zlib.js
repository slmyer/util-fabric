import zlib from 'zlib';
import { promisify } from 'es6-promisify';
/**
 * 基于zlib.gzip 对字符串进行压缩方便传输
 */

const transitionString = async (string) => {
  const result = await promisify(zlib.gzip, zlib)(string);
  return window.btoa(String.fromCharCode(...result));
};

/**
 * 对压缩后的数据 进行转换处理
 */

const recoverString = async (base64String) => {
  const decode = window.atob(base64String);

  const len = decode.length;

  const base64Buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    base64Buffer[i] = decode.charCodeAt(i);
  }

  const result = promisify(zlib.gunzip, zlib)(base64Buffer);

  return result.toString();
};

export { transitionString, recoverString };
