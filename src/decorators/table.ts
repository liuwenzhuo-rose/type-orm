const Table = (tableName: string) => {
  const specifyTableName: ClassDecorator = (targetClass) => {
    (targetClass as any).tableName = tableName;
  };
  return specifyTableName;
};

export default Table;
