import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import TransactionBtn from './components/TransactionBtn';
import ExpenseBtn from './components/ExpenseBtn';
import IncomeBtn from './components/IncomeBtn';

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>

      <View style={styles.btnGroup}>
        {visible && <IncomeBtn />}
        {visible && <ExpenseBtn />}

        <TouchableOpacity onPress={handleVisible}>
          <TransactionBtn visible={visible} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  btnGroup: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    gap: 12,
  },
});

export default HomeScreen;
