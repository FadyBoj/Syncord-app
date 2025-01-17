import {View, Text, ScrollView} from 'react-native';
import {useState, useEffect, FC, useContext} from 'react';
import styles from '../../styles/LoginStyles';
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../globals';

//Components
import CustomTextInput from '../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../components/Buttons/ShrinkButton';
import NavHeader from '../../components/NavHeader/NavHeader';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import { DashboardContext } from '../../context/DashboardContext';

interface Friendship {
  friendShipId: string;
  userId: string;
  latesMessageDate: string;
  messages: Message[];
}
interface Message {
  id: string;
  isSent: boolean;
  text: string;
  createdAt: Date;
  senderId: string;
}

interface Props {
  navigation: any;
}

const Login: FC<Props> = ({navigation}) => {

  //Context
  const dashboard = useContext(DashboardContext)
  const setDashboard = dashboard?.setUser;
  const startConnection = dashboard?.startConnection;
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
      const response = await axios.post(`${globals.baseUrl}/user/login`, {
        email: formData.email.toLocaleLowerCase(),
        password: formData.password,
      });
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      const userResponse = await axios.get(
        `${globals.baseUrl}/user/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const messages: {data: Friendship[]} = await axios.get(
        `${globals.baseUrl}/chat/all-messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if(setDashboard && startConnection)
        {
          setDashboard({...userResponse.data, messages: messages.data});
          await startConnection()
        }
      navigation.replace('AppStack', {screen: 'Chats'});
      setIsLoading(false);
      dashboard?.setIsLoading(false);
    } catch (error:any) {
      setEmailError('Email and password are mismatched');
      setIsLoading(false);
      console.log(error)
    }
  };

  return (
    <>
      <NavHeader backAction={goBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>Welcome back!</Text>
          <Text allowFontScaling={false} style={styles.sloganText}>
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
            <Text allowFontScaling={false} style={styles.forgetText}>Forget your password?</Text>
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
