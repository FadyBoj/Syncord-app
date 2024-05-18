import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, FC, Suspense} from 'react';
import styles from '../../../styles/RegisterFirstTabStyles';
import validator from 'validator';
import axios from 'axios';

//Components
import CustomTextInput from '../../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../../components/Buttons/ShrinkButton';

interface Props {
  navigation: any;
  route: any;
}

const RegisterFirstTab: FC<Props> = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [validForm, setValidForm] = useState(false);
  const {openModal, closeModal} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post(
        'http://syncord.somee.com/user/check-user-exist',
        {
          email: email,
        },
      );
      if (data === true) {
        openModal();
        setIsLoading(false);
        return;

      }
       navigation.jumpTo("RegisterSecondTab")
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (validator.isEmail(email)) return setValidForm(true);

    setValidForm(false);
  }, [email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.mainText}>Enter you email address</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomTextInput
          label="Email"
          value={email}
          changeFunction={setEmail}
          showLabel={false}
        />
        <Text style={styles.confirmEmailText}>
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
