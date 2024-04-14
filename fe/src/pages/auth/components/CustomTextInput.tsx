import colors from '@/constants/colors';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from '@rneui/themed';
import {IconNode} from '@rneui/base';

interface ICustomTextInput {
  label: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  error: string;
  rightIcon?: IconNode;
}

const CustomTextInput: React.FC<ICustomTextInput> = ({
  label,
  secureTextEntry,
  value,
  onChangeText,
  error,
  rightIcon,
}) => {
  return (
    <Input
      secureTextEntry={secureTextEntry ?? false}
      value={value}
      onChangeText={onChangeText}
      rightIcon={rightIcon}
      label={label}
      labelStyle={styles.labelStyle}
      inputContainerStyle={{
        borderBottomWidth: 1,
        borderColor: colors.blue,
      }}
      inputStyle={styles.inputStyle}
      errorMessage={error}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {},
  inputWrapper: {
    borderBottomColor: colors.blue,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  labelStyle: {
    color: colors.gray,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 14,
    fontWeight: '400',
  },
  inputStyle: {
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default CustomTextInput;
