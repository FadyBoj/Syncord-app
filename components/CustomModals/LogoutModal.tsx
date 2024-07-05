import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {FC, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import Modal from '../Modal/Modal';
import ShrinkButton from '../Buttons/ShrinkButton';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DashboardContext} from '../../context/DashboardContext';

interface Props {
  closeModal: () => void;
}

const LogoutModal: FC<Props> = ({closeModal}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false);
  const connection = useContext(DashboardContext)?.connection;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const handleLogout = async () => {
    setIsLoading(true);
    await AsyncStorage.removeItem('token');
    connection?.stop();
    navigation.replace('AuthStack');
  };

  return (
    <Modal
      showClose={false}
      closeModal={closeModal}
      height={250}
      width={screenWidth * 0.85}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Log Out</Text>
        </View>
        <View style={styles.row2}>
          <Text style={styles.desc}>Are you sure you want to log out ? </Text>
          <View style={styles.btnsContainer}>
              <ShrinkButton
              bgColor='#da373c'
              label='Log Out'
              action={handleLogout}
              fit
              height={40}
              radius={50}
               />
               <ShrinkButton
              bgColor='#373a43'
              label='Cancel'
              action={closeModal}
              fit
              height={40}
              radius={50}
               />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    gap: 20,
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
  },
  titleContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#24252b',
    paddingBottom: 10,
  },
  row2:{
    gap:30
  },
  btnsContainer:{
    gap:15
  },
  desc: {
    color: '#999a9f',
    fontFamily:'Roboto'
  },
});

export default LogoutModal;
