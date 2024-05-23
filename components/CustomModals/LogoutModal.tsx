import {View, Text, StyleSheet} from 'react-native';
import {FC, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Modal from '../Modal/Modal';
import ShrinkButton from '../Buttons/ShrinkButton';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  closeModal: () => void;
}

const LogoutModal: FC<Props> = ({closeModal}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading,setIsLoading] = useState(false)

  const handleLogout = async() =>{
    setIsLoading(true)
    await AsyncStorage.removeItem('token');
    navigation.replace('AuthStack')
  }
  return (
    <Modal closeModal={closeModal} height={170} width={280}>
      <View style={styles.container}>
        <Text style={styles.title}>Are you sure you wanna logout ? </Text>
        <View style={styles.btnsContainer}>
          <ShrinkButton
            label="Cancel"
            action={closeModal}
            bgColor="#2d2d35"
            width={120}
            height={50}
            borderWidth={1}
            borderColor="gray"
            radius={8}
          />
          <ShrinkButton
            label="Log out"
            action={handleLogout}
            bgColor="#ff3333"
            width={120}
            height={50}
            radius={8}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default LogoutModal;
