import insert from '../sqlFunctions/insert';

type Enhanced<T extends new () => any> = T & {
  select: (param: InstanceType<T>) => InstanceType<T>[];
  insert: (param: InstanceType<T>) => void;
  update: (param: InstanceType<T>) => {};
  delete: () => {};
};

function wrapper<T extends new () => any>(target: T): Enhanced<T> {
  const tableName = target.name.toLowerCase();

  Object.setPrototypeOf(target, {
    insert: (instance: InstanceType<T>) => {
      insert(tableName, instance);
    },
  });

  return target as Enhanced<T>;
}

class Student {
  name: string;
  age: number;
}

const newObj = wrapper(Student);

newObj.insert({
  name: 'mary',
  age: 29,
});
