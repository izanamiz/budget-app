import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CategoryModal from './CategoryModal';
import colors from '@/constants/colors';
import {TransactionRequest} from '@/services/transactions/types';
import {CategoryResponse, TypeENUM} from '@/services/categories/types';
import {getImgSource} from '@/utils';
import BtnSubSvg from '@/assets/media/transaction/ExpenseBtn.svg';

type CategoryItemFC = {
  index: number;
  setTransactions: React.Dispatch<React.SetStateAction<TransactionRequest[]>>;
  handleSave?: () => void;
  type: TypeENUM;
};
const CategoryItem: React.FC<CategoryItemFC> = ({
  index,
  setTransactions,
  type,
}) => {
  const [visible, setVisible] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<CategoryResponse | null>(null);

  useEffect(() => {
    setTransactions(prev => {
      return prev.map((transaction: TransactionRequest, i: number) => {
        if (i === index) {
          return {
            ...transaction,
            price,
            categoryId: category?._id || '',
          };
        } else {
          return transaction;
        }
      });
    });
  }, [price, category]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handlePriceChange = (text: string) => {
    if (text === '') {
      setPrice(0);
      return;
    }
    const numberValue = parseFloat(text);
    if (!isNaN(numberValue)) {
      setPrice(numberValue);
    }
  };

  const handleRemoveTransaction = useCallback((indexToRemove: number) => {
    setTransactions(prev => {
      return prev.filter((_, index) => index !== indexToRemove);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.row, {flex: 1}]}>
          <TextInput
            placeholder="Giá trị"
            style={styles.textinput}
            value={price.toString()}
            onChangeText={handlePriceChange}
            keyboardType="numeric"
          />
          <Text style={styles.text}>đ</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={[styles.text, {textAlign: 'right'}]}>
            Không có ngân sách
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.row, {gap: 8}]}
          onPress={toggleOverlay}>
          <View style={styles.categoryImg}>
            {!!category?.imageUrl && (
              <Image
                source={{uri: getImgSource(category?.imageUrl)}}
                style={{width: '100%', height: '100%'}}
              />
            )}
          </View>
          <Text style={[styles.text, styles.textBlue]}>
            {category?.name
              ? category?.name
              : 'Chọn hạng mục (Không được để trống)'}
          </Text>
        </TouchableOpacity>
        {!!category?.imageUrl && (
          <TouchableOpacity
            style={styles.btnSub}
            onPress={() => handleRemoveTransaction(index)}>
            <BtnSubSvg width={18} height={18} />
          </TouchableOpacity>
        )}
      </View>
      <CategoryModal
        visible={visible}
        setVisible={setVisible}
        type={type}
        setCategory={setCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  textinput: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    flex: 1,
  },
  categoryImg: {
    backgroundColor: colors.btnDisable,
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  textBlue: {
    color: colors.blue,
  },
  btnSub: {
    backgroundColor: colors.darkGray,
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryItem;
