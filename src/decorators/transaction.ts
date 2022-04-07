import connection from '../connection';
import log from '../logger';

// 修饰DAO对象方法，开启事务
const Transaction: MethodDecorator = (target, propertyKey, descriptor) => {
  const wrapMethod = function (this: any) {
    const that = this;
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          console.log(err);
        } else {
          (descriptor.value as unknown as Function).call(that).then(
            (result: any) => {
              resolve(result);
              connection.commit();
            },
            (err: any) => {
              console.log(err);
              connection.rollback();
            }
          );
        }
      });
    });
  };

  return {
    ...descriptor,
    value: wrapMethod as any,
  };
};

export default Transaction;
