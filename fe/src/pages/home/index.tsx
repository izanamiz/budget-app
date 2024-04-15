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
import RightArrow2 from '@/assets/media/redirect/RightArrow2.svg';
import colors from '@/constants/colors';
import {removeToken} from '@/utils';
import useSWR from 'swr';
import {TOKEN_KEY} from '@/constants';

const HomeScreen = () => {
  const {mutate: mutateStoredToken} = useSWR(TOKEN_KEY);

  const [visible, setVisible] = useState(false);

  const handleVisible = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await removeToken();
    mutateStoredToken(undefined);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>HomeScreen</Text>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[styles.btnContainer, styles.btnLogout]}
          onPress={handleLogout}>
          <Text style={[styles.btnText, styles.btnLogoutText]}>Log out</Text>
          <RightArrow2 />
        </TouchableOpacity>
      </View>

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
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 25,
  },
  btnContainer: {
    padding: 25,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 100,
  },
  btnText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 20,
    letterSpacing: 1,
  },
  btnLogout: {
    backgroundColor: 'transparent',
    borderColor: colors.black,
  },
  btnLogoutText: {
    color: colors.blue,
  },
});

export default HomeScreen;
