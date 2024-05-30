import {View, Text, ScrollView} from 'react-native';
import {useState, useEffect, FC} from 'react';
import styles from '../../../styles/RegisterSecondTabStyles';
import validator from 'validator';

//Components
import CustomTextInput from '../../../components/Inputs/CustomTextInput/Index';
import ShrinkButton from '../../../components/Buttons/ShrinkButton';

interface Props {
  navigation: any;
  route: any;
}

const RegisterSecondTab: FC<Props> = ({navigation, route}) => {
  //Getting previous screen params
  const params = route.params;

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const handleChnage = (value: string, name: string) => {
    setFormData(prevData => {
      return {...prevData, [name]: value};
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () =>{
    const userData = {email:params?.email,...formData};
    setIsLoading(true)
    setTimeout(() =>{
      navigation.jumpTo('RegisterThirdTab',userData)
      setIsLoading(false)
    },1000)
  }

  //Validate form
  useEffect(() => {
    if (!validator.isAlpha(formData.firstname) || formData.firstname.length < 3)
      return setIsFormValid(false);

    if (!validator.isAlpha(formData.lastname) || formData.lastname.length < 3)
      return setIsFormValid(false);

    setIsFormValid(true);
  }, [formData]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.labelInputContainer}>
        <Text style={styles.labelText}>First name</Text>
        <CustomTextInput
          label="First name"
          value={formData.firstname}
          changeFunction={handleChnage}
          name="firstname"
          showLabel={false}
          helper={'First name must be 3 characters at least'}
        />
      </View>
      <View style={styles.labelInputContainer}>
        <Text style={styles.labelText}>Last name</Text>
        <CustomTextInput
          label="Last name"
          value={formData.lastname}
          changeFunction={handleChnage}
          name="lastname"
          showLabel={false}
          helper={'Last name must be 3 characters at least'}
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
          label="Next"
          action={handleSubmit}
          width={100}
          disabled={!isFormValid}
          disabledBg="#3a408a"
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterSecondTab;
