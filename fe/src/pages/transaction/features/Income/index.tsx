import {
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {TypeENUM} from '@/services/categories/types';
import {getAllCategories} from '@/services/categories';
import colors from '@/constants/colors';
import Header from '../../components/Header';
import BtnAddSvg from '@/assets/media/transaction/IncomeBtn.svg';
import DatePicker from '@/assets/media/common/DatePicker.svg';
import Note from '@/assets/media/transaction/Note.svg';
import BtnCancel from '../../components/BtnCancel';
import BtnSave from '../../components/BtnSave';

const IncomeScreen = () => {
  const handlePress = useCallback(async () => {
    try {
      const data = await getAllCategories(TypeENUM.INCOME);
      console.log(data);
    } catch (error) {
      // console.log(error);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={colors.green} />
      <Header headerText={'Thu nhập mới'} backgroundColor={colors.green} />

      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.row, {flex: 1}]}>
            <TextInput placeholder="Giá trị" style={styles.textinput} />
            <Text style={styles.text}>đ</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={[styles.text, {textAlign: 'right'}]}>
              Không có ngân sách
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.row, {gap: 8}]}>
            <View style={styles.categoryImg} />
            <Text style={[styles.text, styles.textBlue]}>Chọn hạng mục</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.row, styles.center]}>
            <Text style={styles.text}>Tổng cộng: 0,00 đ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAdd}>
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

        <View style={[styles.row, {flex: 1, gap: 20, alignItems: 'flex-end'}]}>
          <BtnCancel />
          <BtnSave backgroundColor={colors.green} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  textinput: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    flex: 1,
  },
  categoryImg: {
    backgroundColor: colors.btnDisable,
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  btnAdd: {
    backgroundColor: colors.green,
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  textBlue: {
    color: colors.blue,
  },
});
export default IncomeScreen;
