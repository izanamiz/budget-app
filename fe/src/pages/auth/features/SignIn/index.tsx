import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import Background2 from '@/assets/media/welcome/Background2.svg';
import ColorfulLogo2 from '@/assets/media/welcome/ColorfulLogo2.svg';
import RightArrow1 from '@/assets/media/redirect/RightArrow1.svg';
import RightArrow2 from '@/assets/media/redirect/RightArrow2.svg';
import HidePassword from '@/assets/media/form/HidePassword.svg';
import ShowPassword from '@/assets/media/form/ShowPassword.svg';
import CustomTextInput from '../../components/CustomTextInput';
import {login} from '@/services/auth';
import {saveToken, successToast} from '@/utils';
import useSWR from 'swr';
import {TOKEN_KEY} from '@/constants';
import * as Yup from 'yup';
import {styles} from './style';
import colors from '@/constants/colors';
import {ScreenProps, Screens} from '@/navigation/screens';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

type Errors = {
  email?: string;
  password?: string;
};

const SignIn: React.FC = () => {
  const {mutate: mutateStoredToken} = useSWR(TOKEN_KEY);

  const navigation = useNavigation<ScreenProps<Screens.Tabs>['navigation']>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loginFailMess, setLoginFailMess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inValid, setInValid] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (email && password) setDisabledBtn(false);
  }, [email, password]);

  const handleNavigate = useCallback(() => {
    navigation.navigate(Screens.SignUp);
  }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = useCallback(async () => {
    try {
      await validationSchema.validate({email, password}, {abortEarly: false});
      return true;
    } catch (err) {
      if (Yup.ValidationError.isError(err)) {
        const newErrors: Errors = {};
        err.inner.forEach(({path, message}) => {
          if (path === 'email' || path === 'password')
            newErrors[path] = message;
        });
        setErrors(newErrors);
        setInValid(true);
      }
      return false;
    }
  }, [email, password]);

  const handleSignIn = useCallback(async () => {
    try {
      if (!(await handleValidation())) {
        return;
      }

      const {token} = await login({
        email: email,
        password: password,
      });
      await saveToken(token);
      mutateStoredToken(token);
      setErrors({});
      setLoginFailMess('');
      successToast('Login Successfully');
    } catch (error: any) {
      setLoginFailMess(error.message);
      setErrors({});
      setInValid(false);
    } finally {
      setEmail('');
      setPassword('');
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Background2 />

        <View style={styles.header}>
          <ColorfulLogo2 />
          <Text style={styles.headerText}>Welcome</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Sign In</Text>
          <Text style={styles.errorText}>{inValid ? '' : loginFailMess}</Text>
          <CustomTextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            rightIcon={undefined}
          />
          <CustomTextInput
            label="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            rightIcon={
              <Pressable onPress={handleShowPassword}>
                {showPassword ? <HidePassword /> : <ShowPassword />}
              </Pressable>
            }
          />
        
          <Pressable style={styles.signUpWrapper} onPress={handleNavigate}>
            <Text style={styles.signUpText}>Don't have account. Sign up</Text>
            <RightArrow2 />
          </Pressable>
        </View>

        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={[
              styles.btnContainer,
              disabledBtn && {
                backgroundColor: colors.lightGray,
                borderColor: colors.lightGray,
              },
            ]}
            onPress={handleSignIn}
            disabled={disabledBtn}>
            <Text style={styles.btnText}>Sign in</Text>
            <RightArrow1 />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;
