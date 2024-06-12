import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {FC} from 'react';

//Components
import UserItem from './UserItem';

interface IUser {
  id: string;
  email: string;
  image: string | '';
  firstname: string;
  lastname: string;
}

interface Props {
  users: IUser[];
  setEmail: React.Dispatch<React.SetStateAction<string>>;

  setSearchState: React.Dispatch<
    React.SetStateAction<{
      skeletonVisible: boolean;
      searchHelperVisible: boolean;
    }>
  >;
}

const UserSearchHelper: FC<Props> = ({users, setEmail, setSearchState}) => {
  return (
    <View style={styles.container}>
      {users.slice(0, 3).map((item, index) => {
        return (
          <UserItem
            key={index}
            item={item}
            setEmail={setEmail}
            setSearchState={setSearchState}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: 0,
    width: '100%',
    backgroundColor: '#26272e',
    borderRadius: 12,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    gap: 15,
  },
  userCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
    padding: 10,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: 'blue',
    width: '100%',
  },
  col2: {
    flexDirection: 'column',
    gap: 5,
  },
  profilePicContainer: {
    position: 'relative',
    width: 40,
  },
  profilePic: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 100,
  },
  imagePlaceHolder: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#6441A5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
  },
  name: {
    fontFamily: 'Roboto',
    color: 'white',
  },
  emailText: {
    fontFamily: 'Roboto',
    color: '#585a64',
  },
  hoverStyles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    opacity: 0.3,
    borderRadius: 20,
    zIndex: 30,
  },
});

export default UserSearchHelper;
