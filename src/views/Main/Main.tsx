import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Checkbox,
  RadioGroup,
  RadioButton,
  Button,
  TextField,
} from 'react-native-ui-lib';
import Toast from 'react-native-toast-message';
import {IOperation, IRecord, IShape} from '../../types/common';
import {operations, shapes} from '../../constants';
import {convertRecordToString} from '../../helpers';

function Main() {
  const navigation = useNavigation();

  const [selectedOperations, setSelectedOperations] = useState<IOperation[]>(
    [],
  );
  const [selectedShape, setSelectedShape] = useState<IShape>(shapes[0]);
  const [hasSelectedPlaceholder, setHasSelectedPlaceholder] = useState(false);

  const record = useMemo(
    () => ({
      operations: selectedOperations,
      shape: selectedShape,
    }),
    [selectedOperations, selectedShape],
  );

  const selectedOperationsIds = selectedOperations.reduce((acc, operation) => {
    acc.push(operation.id);

    return acc;
  }, [] as IOperation['id'][]);

  const selectedPlaceholder = useMemo(() => {
    if (!hasSelectedPlaceholder) {
      return '';
    }

    return convertRecordToString(record);
  }, [hasSelectedPlaceholder, record]);

  return (
    <View padding-16>
      <View paddingB-16>
        {operations.map(operation => (
          <View key={operation.id} paddingB-8>
            <Checkbox
              value={selectedOperationsIds.includes(operation.id)}
              onValueChange={(value: boolean) =>
                handleSelectedOperationsChange(operation, value)
              }
              label={operation.title}
            />
          </View>
        ))}
      </View>

      <View paddingB-24>
        <RadioGroup
          initialValue={selectedShape.id}
          onValueChange={handleShapeChange}>
          {shapes.map(shape => (
            <View key={shape.id} paddingB-8>
              <RadioButton value={shape.id} label={shape.title} />
            </View>
          ))}
        </RadioGroup>
      </View>

      <View paddingB-8>
        <Button
          label="OK"
          size={Button.sizes.medium}
          onPress={handleOkPress}
          disabled={!selectedOperations.length}
        />
      </View>

      <Button
        label="Відкрити"
        size={Button.sizes.medium}
        onPress={handleOpenPress}
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
  );

  function handleSelectedOperationsChange(
    operation: IOperation,
    newValue: boolean,
  ) {
    setHasSelectedPlaceholder(false);

    if (!newValue) {
      setSelectedOperations(prev => prev.filter(o => operation.id !== o.id));

      return;
    }

    setSelectedOperations(prev => [...prev, operation]);
  }

  function handleShapeChange(newValue: IShape['id']) {
    setHasSelectedPlaceholder(false);

    const shape = shapes.find(s => s.id === newValue);

    if (!shape) {
      return;
    }

    setSelectedShape(shape);
  }

  async function handleOkPress() {
    try {
      const data = await AsyncStorage.getItem('records');
      const records = (data ? JSON.parse(data) : []) as IRecord[];

      await AsyncStorage.setItem(
        'records',
        JSON.stringify([...records, record]),
      );

      Toast.show({
        type: 'success',
        text1: 'Запис успішно додано',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Не вдалося додати запис',
      });
    }
    setHasSelectedPlaceholder(true);
  }

  function handleOpenPress() {
    navigation.navigate('Details' as never);
  }
}

export default Main;
