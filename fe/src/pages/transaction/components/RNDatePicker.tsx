import React, {useCallback, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import DatePickerSvg from '@/assets/media/common/DatePicker.svg';
import {styles} from '../features/Income/style';
import colors from '@/constants/colors';
import {TypeENUM} from '@/services/categories/types';
import {formatDate} from '@/utils';

type RNDatePickerProps = {
  type: TypeENUM;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};
const RNDatePicker: React.FC<RNDatePickerProps> = ({type, date, setDate}) => {
  const [open, setOpen] = useState(false);

  const dateText = useMemo(() => {
    return formatDate(date);
  }, [date]);

  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.row, {gap: 8}]}
          onPress={() => setOpen(true)}>
          <DatePickerSvg />
          <Text style={[styles.text, styles.textBlue]}>{dateText}</Text>
        </TouchableOpacity>
      </View>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        title={'Chọn ngày'}
        confirmText={'ĐỒNG Ý'}
        cancelText={'HỦY'}
        dividerColor={type === TypeENUM.EXPENSE ? colors.red : colors.green}
        buttonColor={type === TypeENUM.EXPENSE ? colors.red : colors.green}
        locale="vi"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default RNDatePicker;
