import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';
import colors from '@/constants/colors';

const BtnCancel = () => {
  const navigation =
    useNavigation<ScreenProps<Screens.Expense>['navigation']>();

  const handleNavigate = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <Text style={styles.text}>HỦY</Text>
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
    backgroundColor: colors.btnDisable,
  },
  text: {
    color: colors.gray,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
});

export default BtnCancel;
