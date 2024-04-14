import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Background2 from '@/assets/media/welcome/Background2.svg';
import ColorfulLogo2 from '@/assets/media/welcome/ColorfulLogo2.svg';
import RightArrow1 from '@/assets/media/redirect/RightArrow1.svg';
import HidePassword from '@/assets/media/form/HidePassword.svg';
import ValidInput from '@/assets/media/form/ValidInput.svg';
import colors from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';
import CustomTextInput from '../components/CustomTextInput';
import * as Yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    )
    .required('Password is required'),
});

type Errors = Record<string, string>;

const SignIn: React.FC = () => {
  const navigation =
    useNavigation<ScreenProps<Screens.Welcome>['navigation']>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleValidation = useCallback(async () => {
    try {
      await validationSchema.validate({email, password}, {abortEarly: false});
      Alert.alert('Validation passed');
    } catch (err) {
      if (Yup.ValidationError.isError(err)) {
        const newErrors: Errors = {};
        err.inner.forEach(({path, message}) => {
          if (path) newErrors[path] = message;
        });
        setErrors(newErrors);
      }
    }
  }, [email, password]);

  const handleSignIn = useCallback(() => {
    navigation.navigate(Screens.SignIn);
  }, [navigation]);

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
          <CustomTextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            rightIcon={<ValidInput />}
          />
          <CustomTextInput
            label="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            rightIcon={
              <Pressable onPress={handleShowPassword}>
                <HidePassword />
              </Pressable>
            }
          />
        </View>

        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
            <Text style={styles.btnText}>Sign in</Text>
            <RightArrow1 />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 2,
  },
  headerText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 28,
    marginLeft: 50,
    letterSpacing: 2,
  },
  form: {
    paddingHorizontal: 20,
  },
  formTitle: {
    marginHorizontal: 10,
    marginTop: 40,
    marginBottom: 50,
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 28,
    fontWeight: '600',
  },
  btnGroup: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  btnContainer: {
    padding: 25,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  btnText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 20,
    letterSpacing: 1,
  },
});

export default SignIn;
