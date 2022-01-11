export const isNumber = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Number]';
};

export const isString = (value: any) => {
  return Object.prototype.toString.call(value) === '[object String]';
};

export const isBoolean = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Boolean]';
};

export const isArray = (value: any) => {
  return Array.isArray(value);
};
