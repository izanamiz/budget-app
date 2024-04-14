import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import RightArrow1 from '@/assets/media/redirect/RightArrow1.svg';
import RightArrow2 from '@/assets/media/redirect/RightArrow2.svg';
import HidePassword from '@/assets/media/form/HidePassword.svg';
import ShowPassword from '@/assets/media/form/ShowPassword.svg';
import CustomTextInput from '../../components/CustomTextInput';
import * as Yup from 'yup';
import {styles} from './style';
import colors from '@/constants/colors';
import {SignUpData} from '@/services/auth/types';
import {signUp} from '@/services/auth';
import {errorToast, successToast} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'Fullname must be at least 6 characters')
    .required('Fullname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  phoneNumber: Yup.string()
    .matches(/^0\d{9}$/, 'Phone number must have 10 digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
});

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
};

const SignUp: React.FC = () => {
  const navigation = useNavigation<ScreenProps<Screens.Tabs>['navigation']>();

  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    const {name, email, password, phoneNumber, address} = formData;
    if (name && email && password && phoneNumber && address)
      setDisabledBtn(false);
  }, [formData]);

  const handleNavigate = useCallback(() => {
    navigation.navigate(Screens.SignIn);
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = useCallback(async () => {
    try {
      await validationSchema.validate(formData, {abortEarly: false});
      setDisabledBtn(false);
      return true;
    } catch (err) {
      if (Yup.ValidationError.isError(err)) {
        const newErrors: Errors = {};
        err.inner.forEach(({path, message}) => {
          if (
            path === 'name' ||
            path === 'email' ||
            path === 'password' ||
            path === 'phoneNumber' ||
            path === 'address'
          ) {
            newErrors[path] = message;
          }
        });
        setErrors(newErrors);
      }
      setDisabledBtn(true);
      return false;
    }
  }, [formData]);

  const handleSignUp = useCallback(async () => {
    try {
      if (!(await handleValidation())) {
        return;
      }
      await signUp(formData);
      successToast('Sign up successfully', 'Login Now');
      setErrors({});
      handleNavigate();
    } catch (error: any) {
      setErrors({});
      errorToast('Register Failed. Try again');
    } finally {
      setFormData({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
      });
    }
  }, [formData]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Sign Up</Text>
          <CustomTextInput
            label="Fullname"
            value={formData.name}
            onChangeText={value => setFormData({...formData, name: value})}
            error={errors.name}
            rightIcon={undefined}
          />
          <CustomTextInput
            label="Email Address"
            value={formData.email}
            onChangeText={value => setFormData({...formData, email: value})}
            error={errors.email}
            rightIcon={undefined}
          />
          <CustomTextInput
            label="Password"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={value => setFormData({...formData, password: value})}
            error={errors.password}
            rightIcon={
              <Pressable onPress={handleShowPassword}>
                {showPassword ? <HidePassword /> : <ShowPassword />}
              </Pressable>
            }
          />
          <CustomTextInput
            label="Phone number"
            value={formData.phoneNumber}
            onChangeText={value =>
              setFormData({...formData, phoneNumber: value})
            }
            error={errors.phoneNumber}
            rightIcon={undefined}
          />
          <CustomTextInput
            label="Address"
            value={formData.address}
            onChangeText={value => setFormData({...formData, address: value})}
            error={errors.address}
            rightIcon={undefined}
          />
        </View>

        <Pressable style={styles.signInWrapper} onPress={handleNavigate}>
          <Text style={styles.signInText}>Already have account. Login</Text>
          <RightArrow2 />
        </Pressable>

        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              disabledBtn && {
                backgroundColor: colors.lightGray,
                borderColor: colors.lightGray,
              },
            ]}
            onPress={handleSignUp}
            disabled={disabledBtn}>
            <Text style={styles.btnText}>Sign Up</Text>
            <RightArrow1 />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
