/*
 * @Author: Zin, LiaoZhiYong 
 * @Date: 2018-11-28 20:48:41 
 * @Last Modified by: Zin, LiaoZhiYong
 * @Last Modified time: 2019-11-04 20:37:28
 */

'use strict';

const MAX_VALUE = Math.MAX_VALUE,
      MIN_VALUE = Math.MIN_VALUE,
      RATE = [
        // Billion
        { r: 1000000000, u: 'B'},
        // million
        { r: 1000000, u: 'm'},
        // thousand
        { r: 1000, u: 'k'}
      ];

/**
 * format the number to currency, support two model
 * 1、10000 => 10,000
 * 2、10000 => 10k
 * 
 * @param {Boolean} short Whether to abbreviate and convert units
 * @param {Number} fixed decimal, default: 2
 */
Number.prototype.currency = function(short = false, fixed = 2) {
  if (
    typeof this !== 'number' || 
    this < MIN_VALUE || 
    this > MAX_VALUE ||
    (this > -1000 && this < 1000)
  ) { return this; }

  let n = 0;

  if (!short) {
    let _this = (this + '').split('.'),
        _int = _this[0],
        _float = _this[1] ? '.' + _this[1] : '';
  
    n = parseInt(_int).toLocaleString() + _float;
  } else {
    let rate = '';

    switch (true) {
      case this >= 1000000000 || this <= -1000000000:
        rate = RATE.filter(val => val.r === 1000000000)[0];
        break;

      case this >= 1000000 || this <= -1000000:
        rate = RATE.filter(val => val.r === 1000000)[0];
        break;

      case this >= 1000 || this <= -1000:
        rate = RATE.filter(val => val.r === 1000)[0];
        break;
    
      default:
        n = this;
        break;
    }

    if (rate) {
      n = this / rate.r;

      if ((n + '').indexOf('.') >= 0) { n = n.toFixed(fixed) }

      n += rate.u;
    }
  }

  return n;
}

/**
 * calc the midian of two numbers
 * 
 * @param {Number} target number of target
 * @param {Number} fixed decimal, default: -1, retain result
 */
Number.prototype.midian = function (target, fixed = -1) {
  if (typeof target !== 'number' || this === target) {
    return 0;
  }

  let result = this - (this - target) / 2;

  if (fixed > -1) {
    result = result.toFixed(fixed);
  }

  return result - 0;
}