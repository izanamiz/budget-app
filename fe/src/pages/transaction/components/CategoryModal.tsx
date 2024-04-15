import React, {useCallback, useEffect} from 'react';
import {Overlay} from '@rneui/themed';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card} from '@rneui/base';
import colors from '@/constants/colors';
import SearchIcon from '@/assets/media/category/Search.svg';
import CloseIcon from '@/assets/media/category/Close.svg';
import useSWR from 'swr';
import {CategoryResponse, TypeENUM} from '@/services/categories/types';
import {getAllCategoriesByType} from '@/services/categories';
import Loading from '@/components/Loading';
import {FlatList} from 'react-native';
import {getImgSource} from '@/utils';

type CategoryModalProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: TypeENUM;
  setCategory: React.Dispatch<React.SetStateAction<CategoryResponse | null>>;
};

const CategoryModal: React.FunctionComponent<CategoryModalProps> = ({
  visible,
  setVisible,
  type,
  setCategory,
}) => {
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const {data: categories, isLoading} = useSWR(type, getAllCategoriesByType);

  // useEffect(() => {
  //   console.log('categories:', categories);
  // }, [categories]);

  const handleSetCategory = useCallback((category: CategoryResponse) => {
    setCategory(category);
    setVisible(false);
  }, []);

  const renderItem = useCallback(({item}: {item: CategoryResponse}) => {
    return (
      <TouchableOpacity
        style={styles.itemWrapper}
        onPress={() => handleSetCategory(item)}>
        <Image
          source={{uri: getImgSource(item.imageUrl)}}
          style={styles.itemImg}
        />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={[
          styles.overlayStyle,
          {
            backgroundColor:
              type === TypeENUM.EXPENSE ? colors.red : colors.green,
          },
        ]}>
        <View style={styles.headerWrapper}>
          <Pressable style={styles.btnWrapper}>
            <SearchIcon />
          </Pressable>

          <Text style={styles.headerText}>Chọn hạng mục</Text>
          <Pressable style={styles.btnWrapper} onPress={toggleOverlay}>
            <CloseIcon />
          </Pressable>
        </View>
        <View style={styles.overlayBody}>
          <View style={styles.cardWrapper}>
            <Card containerStyle={styles.cardStyle}>
              {isLoading && !categories ? (
                <Loading />
              ) : (
                <FlatList
                  data={categories}
                  renderItem={renderItem}
                  keyExtractor={(item: CategoryResponse) => item._id}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </Card>
          </View>
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 20,
    width: '90%',
    height: '90%',
    backgroundColor: colors.green,
    overflow: 'hidden',
  },
  headerWrapper: {
    height: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  btnWrapper: {padding: 10},
  overlayBody: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: -10,
    marginBottom: -10,
  },
  cardWrapper: {
    position: 'absolute',
    top: -50,
    right: 0,
    bottom: 25,
    left: 0,
  },
  cardStyle: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 25,
    paddingVertical: 35,
    paddingHorizontal: 20,
  },
  itemWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  itemText: {
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  itemImg: {
    width: 45,
    height: 45,
  },
});

export default CategoryModal;
