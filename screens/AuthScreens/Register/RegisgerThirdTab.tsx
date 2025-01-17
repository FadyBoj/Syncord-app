import {View, Text, ScrollView} from 'react-native';
import React, {useState, FC, useEffect, useContext} from 'react';
import styles from '../../../styles/RegisterThirdTabStyles ';
import validator from 'validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globals from '../../../globals';

//Components
import CustomTextInput from '../../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../../components/Buttons/ShrinkButton';
import {AuthContext} from '../../../context/AuthContext';
import {DashboardContext} from '../../../context/DashboardContext';

interface Props {
  navigation: any;
  route: any;
}

interface IregisterRequest {
  msg: string;
  token: string;
}

interface Message {
  id: string;
  isSent: boolean;
  text: string;
  createdAt: Date;
  senderId: string;
}

interface Friendship {
  friendShipId: string;
  userId: string;
  latesMessageDate: string;
  messages: Message[];
}

const RegisgerThirdTab: FC<Props> = ({navigation, route}) => {
  //Context
  const dashboard = useContext(DashboardContext);
  const setDashboard = dashboard?.setUser;
  const startConnection = dashboard?.startConnection;

  const previousData = route?.params;
  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
    if (
      !validator.isStrongPassword(formData.password, {
        minLength: 8,
        minLowercase: 4,
        minUppercase: 1,
        minNumbers: 0,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
      })
    )
      return setIsFormValid(false);

    if (formData.passwordConfirmation !== formData.password)
      return setIsFormValid(false);

    setIsFormValid(true);
  }, [formData]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const userData = {...previousData, ...formData};
      const {msg, token}: IregisterRequest = (
        await axios.post(`${globals.baseUrl}/user/register`, userData)
      ).data;
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
      if (setDashboard && startConnection) {
        setDashboard({...userResponse.data, messages: messages.data});
        await startConnection();
      }
      dashboard?.setIsLoading(false);

      setIsLoading(false);
      navigation.replace('AppStack', {screen: 'Chats'});
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.labelInputContainer}>
        <Text allowFontScaling={false} style={styles.labelText}>Password</Text>
        <CustomTextInput
          label="Password"
          value={formData.password}
          changeFunction={handleChnage}
          name="password"
          showLabel={false}
          helper={'Your password needs to be at least 8 characters long'}
          isPassword
        />
      </View>
      <View style={styles.labelInputContainer}>
        <Text allowFontScaling={false} style={styles.labelText}>Confirm Password</Text>
        <CustomTextInput
          label="Confirm Password"
          value={formData.passwordConfirmation}
          changeFunction={handleChnage}
          name="passwordConfirmation"
          showLabel={false}
          isPassword
        />
      </View>
      <View style={styles.btnsContainer}>
        <ShrinkButton
          bgColor="#373a43"
          label="Back"
          action={goBack}
          width={100}
        />
        <ShrinkButton
          bgColor="#5865f2"
          label="Create account"
          action={handleSubmit}
          width={140}
          disabled={!isFormValid}
          disabledBg="#3a408a"
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

export default RegisgerThirdTab;
