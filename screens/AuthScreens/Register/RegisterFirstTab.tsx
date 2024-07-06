import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, FC, useContext} from 'react';
import styles from '../../../styles/RegisterFirstTabStyles';
import validator from 'validator';
import axios from 'axios';
import {AuthContext} from '../../../context/AuthContext';
import globals from '../../../globals';

//Components
import CustomTextInput from '../../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../../components/Buttons/ShrinkButton';

interface Props {
  navigation: any;
  openModal: () => void;
}

const RegisterFirstTab: FC<Props> = ({navigation, openModal}) => {
  const [validForm, setValidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post(
        `${globals.baseUrl}/user/check-user-exist`,
        {
          email: formData.email,
        },
      );
      if (data === true) {
        openModal();
        setIsLoading(false);
        return;
      }
      navigation.jumpTo('RegisterSecondTab', {email: formData.email});
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChnage = (value: string, name: string) => {
    setFormData(prevData => {
      return {...prevData, [name]: value};
    });
  };

  useEffect(() => {
    if (validator.isEmail(formData.email)) return setValidForm(true);

    setValidForm(false);
  }, [formData.email]);

  const token = useContext(AuthContext);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text allowFontScaling={false} style={styles.mainText}>Enter you email address</Text>
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInput
            label="Email"
            value={formData.email}
            changeFunction={handleChnage}
            showLabel={false}
            name="email"
          />
          <Text allowFontScaling={false} style={styles.confirmEmailText}>
            You'll need to confirm this email later
          </Text>
        </View>
        <View>
          <ShrinkButton
            label="Next"
            action={handleSubmit}
            bgColor="#5865f2"
            disabledBg="#3a408a"
            disabled={!validForm}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
  );
};

export default RegisterFirstTab;
