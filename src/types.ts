interface IOperation {
  id: string;
  title: string;
}

interface IShape {
  id: string;
  title: string;
}

interface IRecord {
  operations: IOperation[];
  shape: IShape;
}

export type {IOperation, IShape, IRecord};
