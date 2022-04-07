// 指定class对应的数据表
const Table = (tableName: string) => {
  const specifyTableName: ClassDecorator = (targetClass) => {
    (targetClass as any).tableName = tableName;
  };
  return specifyTableName;
};

export default Table;
