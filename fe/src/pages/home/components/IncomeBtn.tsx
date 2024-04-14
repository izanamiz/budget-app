import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import colors from '@/constants/colors';
import IncomeBtnSvg from '@/assets/media/transaction/IncomeBtn.svg';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

const IncomeBtn = () => {
  const navigation = useNavigation<ScreenProps<Screens.Home>['navigation']>();

  const handleNavigate = useCallback(() => {
    navigation.navigate(Screens.Income);
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <IncomeBtnSvg />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 65,
    backgroundColor: colors.green,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IncomeBtn;
