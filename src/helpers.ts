import {IRecord} from './types/common';

function convertRecordToString(preview: IRecord) {
  const operationTitles = preview.operations.map(operation => operation.title);
  const operationsString = `Обрані операції: ${operationTitles.join(', ')}`;

  const shapeString = `Фігура: ${preview.shape.title}`;

  return `${operationsString}. ${shapeString}`;
}

export {convertRecordToString};
