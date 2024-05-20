import {View, Text, ScrollView} from 'react-native';
import React, {useState, FC, useEffect} from 'react';
import styles from '../../../styles/RegisterThirdTabStyles ';
import validator from 'validator';

//Components
import CustomTextInput from '../../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../../components/Buttons/ShrinkButton';

interface Props {
  navigation: any;
  route: any;
}

const RegisgerThirdTab: FC<Props> = ({navigation, route}) => {
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

  const handleSubmit = () => {
    //Submit logic
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.labelInputContainer}>
        <Text style={styles.labelText}>Password</Text>
        <CustomTextInput
          label="Password"
          value={formData.password}
          changeFunction={handleChnage}
          name="password"
          showLabel={false}
          helper={'Your password needs to be at least 8 characters long'}
        />
      </View>
      <View style={styles.labelInputContainer}>
        <Text style={styles.labelText}>Confirm Password</Text>
        <CustomTextInput
          label="Confirm Password"
          value={formData.passwordConfirmation}
          changeFunction={handleChnage}
          name="passwordConfirmation"
          showLabel={false}
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
