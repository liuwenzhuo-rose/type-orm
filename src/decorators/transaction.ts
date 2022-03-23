import connection from '../connection';

const transaction: MethodDecorator = (
  targetMethod,
  propertyKey,
  descriptor
) => {
  const wrapMethod = () => {
    return new Promise((resolve, reject) => {
      connection.beginTransaction((err) => {
        if (err) {
          console.log(err);
        } else {
          (descriptor.value as any)().then(
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

export default transaction;
