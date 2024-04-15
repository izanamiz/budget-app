import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '@/constants/colors';
import Header from '../../components/Header';
import BtnAddSvg from '@/assets/media/transaction/IncomeBtn.svg';
import Note from '@/assets/media/transaction/Note.svg';
import BtnCancel from '../../components/BtnCancel';
import BtnSave from '../../components/BtnSave';
import {TransactionRequest} from '@/services/transactions/types';
import {TypeENUM} from '@/services/categories/types';
import CategoryItem from '../../components/CategoryItem';
import {styles} from './style';
import RNDatePicker from '../../components/RNDatePicker';

const IncomeScreen = () => {
  const initialTransaction = {
    price: 0,
    type: TypeENUM.INCOME,
    categoryId: '',
    scheduledAt: new Date(),
    note: '',
  };

  const [transactions, setTransactions] = useState<TransactionRequest[]>([
    initialTransaction,
  ]);

  const [total, setTotal] = useState<number>(0);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState('');

  useEffect(() => {
    const totalPrice = transactions.reduce(
      (total, transaction) => total + transaction.price,
      0,
    );
    setTotal(totalPrice);
  }, [transactions]);

  useEffect(() => {
    const hasInvalidTransactions = transactions.some(
      transaction => !transaction.categoryId || transaction.price <= 0,
    );
    setBtnSaveDisabled(hasInvalidTransactions);
  }, [transactions]);

  const handleChangeDescription = useCallback(() => {
    setTransactions(prev => {
      return prev.map((transaction: TransactionRequest) => {
        return {
          ...transaction,
          note: description,
        };
      });
    });
  }, [transactions, description]);

  const handleAddNewTransaction = useCallback(() => {
    setTransactions(prev => [...prev, initialTransaction]);
  }, []);

  const handleAddDateToTransactions = useCallback(() => {
    setTransactions(prev => {
      return prev.map((transaction: TransactionRequest) => {
        return {
          ...transaction,
          scheduledAt: date,
        };
      });
    });
  }, [transactions, date]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.green} />
      <ScrollView>
        <Header headerText={'Thu nhập mới'} backgroundColor={colors.green} />

        <View style={styles.container}>
          {transactions.map((item: TransactionRequest, index: number) => (
            <CategoryItem
              key={index}
              index={index}
              setTransactions={setTransactions}
              type={TypeENUM.INCOME}
            />
          ))}

          <View style={styles.row}>
            <TouchableOpacity style={[styles.row, styles.center]}>
              <Text style={styles.text}>Tổng cộng: {total} đ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={handleAddNewTransaction}>
              <BtnAddSvg width={18} height={18} />
            </TouchableOpacity>
          </View>

          <RNDatePicker type={TypeENUM.INCOME} date={date} setDate={setDate} />

          <View style={styles.row}>
            <TouchableOpacity style={[styles.row, {gap: 8}]}>
              <Note />
              <TextInput
                placeholder="Ghi chú"
                style={styles.textinput}
                value={description}
                onChangeText={setDescription}
                onEndEditing={handleChangeDescription}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.row,
              {
                marginTop: 30,
                gap: 20,
                alignItems: 'flex-end',
              },
            ]}>
            <BtnCancel />
            <BtnSave
              backgroundColor={colors.green}
              btnSaveDisabled={btnSaveDisabled}
              transactions={transactions}
              handlePress={handleAddDateToTransactions}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IncomeScreen;
