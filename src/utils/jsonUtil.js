// src/utils/jsonUtil.js
import testData from '../testdata/json/uploadmedia.json' assert { type: 'json' };

export function getValue(keyPath) {
  return keyPath.split('.').reduce((obj, key) => obj?.[key], testData);
}

