import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';
import colors from '@/constants/colors';

const BtnSave = ({backgroundColor}: {backgroundColor: string}) => {
  const navigation =
    useNavigation<ScreenProps<Screens.Expense>['navigation']>();

  const handleSave = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={handleSave}>
      <Text style={styles.text}>LƯU</Text>
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
