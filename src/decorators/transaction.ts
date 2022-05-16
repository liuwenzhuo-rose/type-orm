import connection from '../pool';

const Transaction: MethodDecorator = (target, propertyKey, descriptor) => {
  console.log(target, propertyKey, descriptor);
  const originMethod = descriptor.value as unknown as Function;
  const proxyMethod = function (this: any) {
    const that = this;
    return new Promise((resolve, _) => {
      connection.beginTransaction((err) => {
        if (err) {
          return console.log(err);
        }
        originMethod.call(that).then(
          (result: any) => {
            resolve(result);
            connection.commit();
          },
          (err: any) => {
            connection.rollback();
          }
        );
      });
    });
  };

  return {
    ...descriptor,
    value: proxyMethod as any,
  };
};

export default Transaction;
