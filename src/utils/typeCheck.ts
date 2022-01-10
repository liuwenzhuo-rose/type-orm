const toString = Object.prototype.toString;

export const isNumber = (value: any) => {
  return toString.call(value) === 'Object Number';
};

export const isString = (value: any) => {
  return toString.call(value) === 'Object String';
};

export const isBoolean = (value: any) => {
  return toString.call(value) === 'Object Boolean';
};

export const isArray = (value: any) => {
  return Array.isArray(value);
};
