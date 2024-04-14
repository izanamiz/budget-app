import React from 'react';
import {Overlay} from '@rneui/themed';
import {View, StyleSheet, Text} from 'react-native';
import {Card} from '@rneui/base';
import colors from '@/constants/colors';

type CategoryModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundColor?: string;
};

const CategoryModal: React.FunctionComponent<CategoryModalProps> = ({
  visible,
  setVisible,
}) => {
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          borderRadius: 20,
          width: '90%',
          height: '90%',
          backgroundColor: colors.green,
          overflow: 'hidden',
        }}>
        <View style={{height: '20%', justifyContent: 'center'}}>
          <Text style={styles.headerText}>Chọn hạng mục</Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            margin: -10,
          }}></View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 30,
            left: 0,
          }}>
          <View style={{height: '13.33%'}}></View>
          <Card
            containerStyle={{
              flex: 1,
              marginHorizontal: 20,
              borderRadius: 20,
            }}></Card>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 18,
  },
});

export default CategoryModal;
