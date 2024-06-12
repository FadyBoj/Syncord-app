import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {FC, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import validator from 'validator';
import axios from 'axios';

//Components
import Modal from '../Modal/Modal';
import ShrinkButton from '../Buttons/ShrinkButton';
import {DashboardContext} from '../../context/DashboardContext';
import SearchSkeleton from '../Skeletons/SearchSkeleton';
import UserSearchHelper from '../UserSearchHelper/UserSearchHelper';

interface Props {
  closeModal: () => void;
}
interface IUser {
  id: string;
  email: string;
  image: string | '';
  firstname: string;
  lastname: string;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const AddFriendModal: FC<Props> = ({closeModal}) => {
  const userDashboard = useContext(DashboardContext)?.user;

  const [isLoading, setIsLoading] = useState(false);
  const [validForm, setIsValidForm] = useState(false);
  const connection = useContext(DashboardContext)?.connection;
  const [email, setEmail] = useState('');
  const [delay, setDelay] = useState<NodeJS.Timeout | null>(null);
  const [searchState, setSearchState] = useState({
    skeletonVisible: false,
    searchHelperVisible: false,
  });
  const [searchedUsers, setSearchedusers] = useState<IUser[] | null>(null);

  const user = useContext(DashboardContext)?.user;

  const handleTextChange = (text: string) => {
    setEmail(text);
    if (text.length === 0) {
      setSearchState({
        searchHelperVisible: false,
        skeletonVisible: false,
      });
      return;
    }
    if (validator.isEmail(text)) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
    if (delay) clearTimeout(delay);

    setSearchState({
      skeletonVisible: true,
      searchHelperVisible: false,
    });

    setDelay(
      setTimeout(async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(
            `https://syncord.runasp.net/friendShip/search?search=${email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const friendsIds = user?.friends.map(item => {
            return item.userId;
          });
          let filterdUsers: IUser[] = [];
          if (response.data) {
            response.data.map((item: IUser,index:number) => {
              // console.log(item.id,friendsIds && friendsIds[index])
              if (!friendsIds?.includes(item.id)) filterdUsers.push(item);
            });
          }
          setSearchedusers(filterdUsers);
          setSearchState({
            skeletonVisible: false,
            searchHelperVisible:
              response.data && response.data.length > 0 ? true : false,
          });
        } catch (error) {
          setSearchState({
            skeletonVisible: false,
            searchHelperVisible: false,
          });
          console.log(error)
        }
      }, 500),
    );
  };

  //Removing skeleton if user clicked outside it
  const handlePressOutside = () => {
    setSearchState({
      skeletonVisible: false,
      searchHelperVisible: false,
    });
  };


  //Hanlde sending friend request
 
  const handleSubmit = () =>{
  }


  return (
    <Modal
      closeModal={closeModal}
      height={screenHeight * 0.8}
      width={screenWidth * 0.85}>
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Add a friend on Syncord</Text>
              <Text style={styles.slogan}>
                You can add friends by their email address
              </Text>
            </View>
            <View style={styles.row2}>
              <Text style={styles.description}>
                Who would you like to add as a friend?
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor={'#585a64'}
                onChangeText={handleTextChange}
                value={email}
              />
              <Text style={styles.description}>
                By the way your Name is
                <Text style={styles.email}>
                  {'  '}
                  {`${user?.firstname} ${user?.lastname}`}
                </Text>
              </Text>
              {/* Skeleton when user tries to search for user */}
              {searchState.skeletonVisible && <SearchSkeleton />}
              {searchedUsers && searchState.searchHelperVisible && (
                <UserSearchHelper
                  users={searchedUsers}
                  setEmail={setEmail}
                  setSearchState={setSearchState}
                />
              )}
            </View>
          </View>
          <ShrinkButton
            label="Send friend request"
            action={handleSubmit}
            bgColor="#5865f2"
            disabledBg="#3a408a"
            disabled={!validForm}
            isLoading={isLoading}
            fit
            radius={100}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flexDirection: 'column',
    paddingBottom: 20,
    alignItems: 'center',
    width: '100%',
    gap: 50,
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  slogan: {
    color: '#585a64',
    fontFamily: 'Roboto',
  },
  row2: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 13,
    position: 'relative',
  },
  input: {
    backgroundColor: '#111216',
    width: '100%',
    borderRadius: 15,
    color: 'white',
    paddingLeft: 20,
  },
  description: {
    fontFamily: 'Roboto',
    color: '#585a64',
    transform: [{translateX: 5}],
  },
  email: {
    color: '#b1b2b7',
  },
});

export default AddFriendModal;
