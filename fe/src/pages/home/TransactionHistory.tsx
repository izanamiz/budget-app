import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Card} from '@rneui/base';
import colors from '@/constants/colors';
import ArrowRight from '@/assets/media/transaction/ArrowRight.svg';
import {getAllTransactions} from '@/services/transactions';
import {TransactionResponse} from '@/services/transactions/types';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {getImgSource} from '@/utils';
import {TypeENUM} from '@/services/categories/types';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<
    TransactionResponse[] | null
  >(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const transactions = await getAllTransactions();
        setTransactions(transactions);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  //   useEffect(() => {
  //     console.log(transactions);
  //   }, [transactions]);

  const renderItem = useCallback(({item}: {item: TransactionResponse}) => {
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
  }, []);

  return (
    <Card containerStyle={{height: 300, borderRadius: 30}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: colors.black,
            fontFamily: 'SF-Pro-Display-Regular',
            fontSize: 16,
          }}>
          Lịch sử giao dịch
        </Text>
        <ArrowRight />
      </View>
      {!!transactions && (
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </Card>
  );
};

export default TransactionHistory;
