import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import colors from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';
import ExpenseBtnSvg from '@/assets/media/transaction/ExpenseBtn.svg';

const ExpenseBtn = () => {
  const navigation = useNavigation<ScreenProps<Screens.Home>['navigation']>();

  const handleNavigate = useCallback(() => {
    navigation.navigate(Screens.Expense);
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <ExpenseBtnSvg />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    backgroundColor: colors.red,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpenseBtn;
