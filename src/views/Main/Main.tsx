import React, {useMemo, useState} from 'react';
import {
  View,
  Checkbox,
  RadioGroup,
  RadioButton,
  Button,
  TextField,
} from 'react-native-ui-lib';

enum Operation {
  Area = 'area',
  Perimeter = 'perimeter',
}

const operations = [
  {
    title: 'Площа',
    type: Operation.Area,
  },
  {
    title: 'Периметр',
    type: Operation.Perimeter,
  },
];

enum Shape {
  Square = 'square',
  Triangle = 'triangle',
  Circle = 'circle',
}

const shapes = [
  {
    title: 'Квадрат',
    type: Shape.Square,
  },
  {
    title: 'Трикутник',
    type: Shape.Triangle,
  },
  {
    title: 'Коло',
    type: Shape.Circle,
  },
];

interface ISelectedOperations {
  [Operation.Area]: boolean;
  [Operation.Perimeter]: boolean;
}

function Main() {
  const [selectedOperations, setSelectedOperations] =
    useState<ISelectedOperations>({
      area: false,
      perimeter: false,
    });
  const [selectedShape, setSelectedShape] = useState<Shape>(Shape.Square);
  const [hasSelectedPlaceholder, setHasSelectedPlaceholder] = useState(false);

  const isOkButtonDisabled = useMemo(() => {
    const hasSelectedOperations = Object.values(selectedOperations).some(
      value => value,
    );

    return !hasSelectedOperations;
  }, [selectedOperations]);

  const selectedPlaceholder = useMemo(() => {
    if (!hasSelectedPlaceholder) {
      return '';
    }

    const selectedOperationsTitles = operations.reduce((acc, operation) => {
      if (selectedOperations[operation.type]) {
        acc.push(operation.title);
      }

      return acc;
    }, [] as string[]);

    const selectedShapeTitle = shapes.find(
      shape => shape.type === selectedShape,
    )?.title;

    return `Обрані операції: ${selectedOperationsTitles.join(
      ', ',
    )}; обрана фігура: ${selectedShapeTitle}`;
  }, [hasSelectedPlaceholder, selectedOperations, selectedShape]);

  return (
    <View useSafeArea>
      <View padding-16>
        <View paddingB-16>
          {operations.map(operation => (
            <View paddingB-8>
              <Checkbox
                value={selectedOperations[operation.type]}
                onValueChange={(value: boolean) =>
                  handleOperationChange(operation.type, value)
                }
                label={operation.title}
              />
            </View>
          ))}
        </View>

        <View paddingB-24>
          <RadioGroup
            initialValue={selectedShape}
            onValueChange={handleShapeChange}>
            {shapes.map(shape => (
              <View paddingB-8>
                <RadioButton value={shape.type} label={shape.title} />
              </View>
            ))}
          </RadioGroup>
        </View>

        <Button
          label="OK"
          size={Button.sizes.medium}
          onPress={handleOkPress}
          disabled={isOkButtonDisabled}
        />

        {hasSelectedPlaceholder && (
          <View paddingT-16>
            <TextField
              placeholder={selectedPlaceholder}
              editable={false}
              multiline
            />
          </View>
        )}
      </View>
    </View>
  );

  function handleOperationChange(operationType: Operation, newValue: boolean) {
    setSelectedOperations(prev => ({
      ...prev,
      [operationType]: newValue,
    }));
    setHasSelectedPlaceholder(false);
  }

  function handleShapeChange(newValue: Shape) {
    setSelectedShape(newValue);
    setHasSelectedPlaceholder(false);
  }

  function handleOkPress() {
    setHasSelectedPlaceholder(true);
  }
}

export default Main;
