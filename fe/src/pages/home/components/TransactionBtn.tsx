import {View, StyleSheet} from 'react-native';
import React from 'react';
import colors from '@/constants/colors';
import Close from '@/assets/media/transaction/Close.svg';
import Open from '@/assets/media/transaction/Open.svg';

const TransactionBtn = ({visible}: {visible: boolean}) => {
  return <View style={styles.container}>{visible ? <Close /> : <Open />}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    backgroundColor: colors.blue,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionBtn;
