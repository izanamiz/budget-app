import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import colors from '@/constants/colors';
import LeftArrow from '@/assets/media/redirect/LeftArrow.svg';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

type HeaderFC = {
  headerText: string;
  backgroundColor: string;
};
const Header: React.FC<HeaderFC> = ({headerText, backgroundColor}) => {
  const navigation =
    useNavigation<ScreenProps<Screens.Expense>['navigation']>();

  const handleNavigate = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={[styles.header, {backgroundColor}]}>
      <Pressable
        style={{position: 'absolute', left: 30}}
        onPress={handleNavigate}>
        <LeftArrow />
      </Pressable>

      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingHorizontal: 30,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  headerText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 18,
  },
});
export default Header;
