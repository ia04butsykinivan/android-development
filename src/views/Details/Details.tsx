import React, {useEffect, useState} from 'react';
import {View, GridList, GridListItem} from 'react-native-ui-lib';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRecord} from '../../types';
import {convertRecordToString} from '../../helpers';

function Details() {
  const [records, setRecords] = useState<IRecord[]>([]);

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <View padding-16>
      <GridList
        numColumns={1}
        data={records}
        renderItem={({item, index}) => (
          <GridListItem
            key={index}
            alignToStart
            containerStyle={{width: '100%'}}
            title={index.toString()}
            subtitle={convertRecordToString(item)}
          />
        )}
      />
    </View>
  );

  async function getRecords() {
    try {
      const data = await AsyncStorage.getItem('records');

      if (!data) {
        return;
      }

      const parsedData = JSON.parse(data) as IRecord[];
      setRecords(parsedData);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Не вдалося отримати записи',
      });
    }
  }
}

export default Details;
