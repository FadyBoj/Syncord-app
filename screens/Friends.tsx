import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {useState, FC, useEffect, useContext, createContext,memo} from 'react';
import styles from '../styles/FriendsStyles';
import {IUserOv} from '../navigators/AppNavigator';

//Components
import ShrinkButton from '../components/Buttons/ShrinkButton';
import FriendsList from '../components/FriendsList/FriendsList';
import CustomTextInput from '../components/Inputs/CustomTextInput/Index';
import FilterBtn from '../components/FilterBtn/FilterBtn';
import Header from '../components/Header/Header';
import AddFriendModal from '../components/CustomModals/AddFriendModal';
import UserOv from '../components/UserOv/UserOv';
import SingleBackDrop from '../components/Backdrop/SingleBackDrop';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

//Assets
import addFriendIcon from '../assets/addFriend.png';
import searchIcon from '../assets/search.png';
import {DashboardContext} from '../context/DashboardContext';
import emptyFriends from '../assets/emptyFriends.png';
import Animated from 'react-native-reanimated';

interface IRequest {
  id: number;
  userId: string;
  email: string;
  outGoing: boolean;
}

interface IFriend {
  friendShipId: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
  image: string;
}

interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  requests: IRequest[];
  friends: IFriend[];
}

interface Props {
  openAddFriendModal: () => void;
  closeAddFriendModal: () => void;
  addFriendModal: boolean;
  userOv: IUserOv;
  openUserOv: () => void;
  closeUserOv: () => void;
  setUserOv: React.Dispatch<React.SetStateAction<IUserOv>>;
}

interface IContext {
  setUserOv: React.Dispatch<React.SetStateAction<IUserOv>>;
}

//Context
export const UserOvContext = createContext<IContext | null>(null);

const Friends: FC<Props> = ({
  openAddFriendModal,
  closeAddFriendModal,
  addFriendModal,
  userOv,
  openUserOv,
  closeUserOv,
  setUserOv,
}) => {
  const dashboard = useContext(DashboardContext);
  const user = dashboard?.user;
  const filters = ['Online', 'Offline', 'All'];

  //States
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredFriends, setFilteredFriends] = useState<IFriend[] | null>(
    null,
  );
  const [filterData, setFilterData] = useState({
    search: '',
  });

  //Handle search text input change
  const handleChange = (text: string, name: string) => {
    setFilterData(prevData => {
      return {...prevData, [name]: text};
    });
  };

  //Chanage filter,
  const handleFilterChange = (name: string) => {
    setStatusFilter(name);
  };

  useEffect(() => {
    setFilteredFriends(prevData => {
      if (!prevData || !user) return prevData;

      return user?.friends.filter(f =>
        `${f.firstname} ${f.lastname}`
          .toLocaleLowerCase()
          .startsWith(filterData.search.toLocaleLowerCase().trim()),
      );
    });
  }, [filterData.search, statusFilter]);

  useEffect(() => {
    user?.friends && setFilteredFriends(user.friends);
  }, [user]);

  const addFriendsBtn = () => {
    return (
      <View style={styles.addFriendContainer}>
        <ShrinkButton
          label="Add friends"
          icon={addFriendIcon}
          fit
          radius={100}
          paddingLeft={20}
          paddingRight={20}
          bgColor="#26262e"
          iconMove={0}
          action={openAddFriendModal}
        />
      </View>
    );
  };

  return (
    <UserOvContext.Provider value={{setUserOv}}>
      <GestureHandlerRootView>
        <FlatList
          contentContainerStyle={styles.container}
          data={[1]}
          renderItem={({item}) => (
            <View style={styles.wrapper}>
              <Header title="Friends" rightComponent={addFriendsBtn} />
              <View style={styles.container}>
                <View style={styles.sec1}>
                  {/* Search input container */}
                  <View>
                    <CustomTextInput
                      showLabel={false}
                      label="Search"
                      value={filterData.search}
                      changeFunction={handleChange}
                      name="search"
                      radius={18}
                      bgColor="black"
                      icon={searchIcon}
                    />
                  </View>
                </View>
                {/* Sec 2 */}
                <View style={styles.sec2}>
                  <View style={styles.filtersContainer}>
                    {filters.map((item, index) => {
                      return (
                        <FilterBtn
                          key={index}
                          name={item}
                          isActive={
                            item.toLocaleLowerCase() ===
                            statusFilter.toLocaleLowerCase()
                          }
                          handleFilterChange={handleFilterChange}
                        />
                      );
                    })}
                  </View>
                  {filteredFriends &&
                    (statusFilter === 'online' || statusFilter === 'all') &&
                    filteredFriends?.filter(f => f.isOnline).length > 0 && (
                      <View style={styles.friendsListContainer}>
                        <FriendsList
                          status="Online"
                          friends={filteredFriends?.filter(f => f.isOnline)}
                        />
                      </View>
                    )}
                  {filteredFriends &&
                    (statusFilter === 'offline' || statusFilter === 'all') &&
                    filteredFriends?.filter(f => !f.isOnline).length > 0 && (
                      <View style={styles.friendsListContainer}>
                        <FriendsList
                          status="Offline"
                          friends={filteredFriends?.filter(f => !f.isOnline)}
                        />
                      </View>
                    )}
                  {statusFilter === 'online' &&
                  filteredFriends?.filter(f => f.isOnline).length === 0 ? (
                    <View style={styles.emptyContainer}>
                      <Image source={emptyFriends} style={styles.emptyImage} />
                      <Text allowFontScaling={false} style={styles.emptyText}>
                        No online friends
                      </Text>
                    </View>
                  ) : statusFilter === 'offline' &&
                    filteredFriends?.filter(f => !f.isOnline).length === 0 ? (
                    <View style={styles.emptyContainer}>
                      <Image source={emptyFriends} style={styles.emptyImage} />
                      <Text allowFontScaling={false} style={styles.emptyText}>
                        No offline friends
                      </Text>
                    </View>
                  ) : (
                    statusFilter === 'all' &&
                    filteredFriends?.length === 0 && (
                      <View style={styles.emptyContainer}>
                        <Image
                          source={emptyFriends}
                          style={styles.emptyImage}
                        />
                        <Text allowFontScaling={false} style={styles.emptyText}>
                          You don't have any friends yet
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
              {addFriendModal && (
                <AddFriendModal closeModal={closeAddFriendModal} />
              )}

              {userOv.visible && <SingleBackDrop close={closeUserOv} />}
              {userOv.data && (
                <UserOv
                  isOpen={userOv.visible}
                  user={userOv.data}
                  closeUserOv={closeUserOv}
                />
              )}
            </View>
          )}
        />
      </GestureHandlerRootView>
    </UserOvContext.Provider>
  );
};
export default memo(Friends);
