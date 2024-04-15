import {
  Text,
  StatusBar,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '@/constants/colors';
import Header from '../../components/Header';
import BtnAddSvg from '@/assets/media/transaction/IncomeBtn.svg';
import DatePicker from '@/assets/media/common/DatePicker.svg';
import Note from '@/assets/media/transaction/Note.svg';
import BtnCancel from '../../components/BtnCancel';
import BtnSave from '../../components/BtnSave';
import {TransactionRequest} from '@/services/transactions/types';
import {TypeENUM} from '@/services/categories/types';
import CategoryItem from '../../components/CategoryItem';
import {styles} from './style';

const IncomeScreen = () => {
  const initialTransaction = {
    price: 0,
    type: TypeENUM.INCOME,
    categoryId: '',
  };

  const [transactions, setTransactions] = useState<TransactionRequest[]>([
    {
      price: 0,
      type: TypeENUM.INCOME,
      categoryId: '',
    },
  ]);

  const [total, setTotal] = useState<number>(0);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);

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

  const handleAddNewTransaction = useCallback(() => {
    setTransactions(prev => [...prev, initialTransaction]);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <StatusBar backgroundColor={colors.green} />
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

          <View style={styles.row}>
            <TouchableOpacity style={[styles.row, {gap: 8}]}>
              <DatePicker />
              <Text style={[styles.text, styles.textBlue]}>01/03/2024</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.row, {gap: 8}]}>
              <Note />
              <TextInput placeholder="Ghi chú" style={styles.textinput} />
            </TouchableOpacity>
          </View>

          <View
            style={[styles.row, {flex: 1, gap: 20, alignItems: 'flex-end'}]}>
            <BtnCancel />
            <BtnSave
              backgroundColor={colors.green}
              btnSaveDisabled={btnSaveDisabled}
              transactions = {transactions}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IncomeScreen;
