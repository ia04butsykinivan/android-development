import {IOperation, IShape} from './types';

const operations: IOperation[] = [
  {
    id: 'area',
    title: 'Площа',
  },
  {
    id: 'perimeter',
    title: 'Периметр',
  },
];

const shapes: IShape[] = [
  {
    id: 'square',
    title: 'Квадрат',
  },
  {
    id: 'triangle',
    title: 'Трикутник',
  },
  {
    id: 'circle',
    title: 'Коло',
  },
];

export {operations, shapes};
