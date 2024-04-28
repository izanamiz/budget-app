import {View, Text} from 'react-native';
import React from 'react';
import {TransactionResponse} from '@/services/transactions/types';
import { TypeENUM } from '@/services/categories/types';
import colors from '@/constants/colors';

const TransactionItem = ({item}: {item: TransactionResponse}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <Text>{item.categoryId}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: item.type === TypeENUM.EXPENSE ? colors.red : colors.green,
          }}>
          {item.type === TypeENUM.EXPENSE
            ? `-${item.price} đ`
            : `+${item.price} đ`}
        </Text>
        <ArrowRight />
      </View>
    </View>
  );
};

export default TransactionItem;
