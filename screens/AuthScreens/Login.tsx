import {View, Text, ScrollView} from 'react-native';
import {useState, useEffect, FC, useContext} from 'react';
import styles from '../../styles/LoginStyles';
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import CustomTextInput from '../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../components/Buttons/ShrinkButton';
import NavHeader from '../../components/NavHeader/NavHeader';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

interface Props {
  navigation: any;
}

const Login: FC<Props> = ({navigation}) => {
  //Getting previous screen params

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>('');

  const handleChnage = (value: string, name: string) => {
    setFormData(prevData => {
      return {...prevData, [name]: value};
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  //Validate form
  useEffect(() => {
    if (!validator.isEmail(formData.email)) return setIsFormValid(false);

    if (formData.password.length < 8) return setIsFormValid(false);

    setIsFormValid(true);
  }, [formData]);


  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://syncord.runasp.net/user/login', {
        email: formData.email.toLocaleLowerCase(),
        password: formData.password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      const userResponse = await axios.get(
        'https://syncord.runasp.net/user/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigation.replace('AppStack', {screen: 'Chats'});
      setIsLoading(false);
    } catch (error) {
      setEmailError('Email and password are mismatched');
      setIsFormValid(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavHeader backAction={goBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Welcome back!</Text>
          <Text style={styles.sloganText}>
            We're so excited to see you again!
          </Text>
        </View>
        <View style={styles.inptsContainer}>
          <View style={styles.labelInputContainer}>
            <CustomTextInput
              label="Email"
              value={formData.email}
              changeFunction={handleChnage}
              name="email"
              showLabel={false}
              isError={emailError.length > 0}
              errorMsg={emailError}
            />
          </View>
          <View style={styles.labelInputContainer}>
            <CustomTextInput
              label="Password"
              value={formData.password}
              changeFunction={handleChnage}
              name="password"
              showLabel={false}
              isPassword
            />
          </View>
          <View>
            <Text style={styles.forgetText}>Forget your password?</Text>
          </View>
        </View>

        <View style={styles.btnsContainer}>
          <ShrinkButton
            bgColor="#5865f2"
            disabledBg="#3a408a"
            disabled={!isFormValid}
            label="Login"
            action={handleLogin}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default Login;
