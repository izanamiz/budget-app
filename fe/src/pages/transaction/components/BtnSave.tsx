import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';
import colors from '@/constants/colors';
import {TransactionRequest} from '@/services/transactions/types';
import {createTransaction} from '@/services/transactions';
import {errorToast, successToast} from '@/utils';

type BtnSaveFC = {
  backgroundColor: string;
  btnSaveDisabled: boolean;
  transactions: TransactionRequest[];
  handlePress: () => void;
};
const BtnSave: React.FC<BtnSaveFC> = ({
  backgroundColor,
  btnSaveDisabled,
  transactions,
  handlePress,
}) => {
  const navigation =
    useNavigation<ScreenProps<Screens.Expense>['navigation']>();

  const handleSaveTransactions = useCallback(async () => {
    try {
      handlePress();
      console.log(transactions);
      for (const transaction of transactions) {
        await createTransaction(transaction);
      }
      successToast('All transactions saved successfully');
    } catch (error) {
      console.error('Error saving transactions:', error);
      errorToast('Error saving transactions');
    } finally {
      navigation.goBack();
    }
  }, [transactions]);

  return (
    <TouchableOpacity
      disabled={btnSaveDisabled}
      style={[
        styles.container,
        {
          backgroundColor: btnSaveDisabled
            ? colors.btnDisable
            : backgroundColor,
        },
      ]}
      onPress={handleSaveTransactions}>
      <Text
        style={[
          styles.text,
          {color: btnSaveDisabled ? backgroundColor : colors.white},
        ]}>
        LƯU
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  text: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
});

export default BtnSave;
