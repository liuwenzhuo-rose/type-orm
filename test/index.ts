const Entity: ClassDecorator = (constructor: any) => {
  constructor.prototype.hello = () => {
    console.log('hello');
  };
};

@Entity
class Student {
  name: string;
  age: number;
}

const Jack = new Student();
Jack.name = 'Jack';
Jack.age = 20;
