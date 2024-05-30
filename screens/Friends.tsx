import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useState, FC, useRef, useEffect, useContext, useId, memo} from 'react';
import styles from '../styles/FriendsStyles';

//Components
import MainLayout from '../components/MainLayout';
import {AuthContext} from '../context/AuthContext';
import ShrinkButton from '../components/Buttons/ShrinkButton';
import FriendsList from '../components/FriendsList/FriendsList';
import CustomTextInput from '../components/Inputs/CustomTextInput/Index';
import FilterBtn from '../components/FilterBtn/FilterBtn';

//Assets
import addFriendIcon from '../assets/addFriend.png';
import searchIcon from '../assets/search.png';
import {DashboardContext} from '../context/DashboardContext';

interface IRequest {
  id: number;
  userId: string;
  email: string;
  outGoing: boolean;
}

interface IFriend {
  id: string;
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
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

const Friends: FC = props => {
  const getDashboard = useContext(DashboardContext)?.getDashboard;
  const connection = useContext(DashboardContext)?.connection;
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (getDashboard) {
        const data = await getDashboard();
        setUser(data);
      }
    };
    fetchDashboard();
  }, [0]);

  const handleHoppingOnline = (id: string) => {
    setUser(prevData => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        friends: prevData.friends.map(item => {
          return item.id !== id ? item : {...item, isOnline: true};
        }),
      };
    });
  };
  const handleGoOffline = (id: string) => {
    setUser(prevData => {
      if (!prevData) return prevData;

      return {
        ...prevData,
        friends: prevData.friends.map(item => {
          return item.id !== id ? item : {...item, isOnline: false};
        }),
      };
    });
  };
  useEffect(() =>{
    connection?.on('hoppedOnline',handleHoppingOnline);
    connection?.on('wentOffline', handleGoOffline);

  },[0])

  const filters = ['Online', 'Offline', 'All'];

  //States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('online');
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
    // Filtering logic
  }, [filterData.search, statusFilter]);

  useEffect(() =>{
   user?.friends && setFilteredFriends(user?.friends)
  },[user])


      console.log(user?.friends)

  return (
    <MainLayout isDrawerOpen={isDrawerOpen} activeScreen="Friends">
      <View style={styles.container}>
        <View style={styles.sec1}>
          <View style={styles.addFriendContainer}>
            {/* <Image style={styles.addFriendIcon} source={addFriend} /> */}
            <ShrinkButton
              label="Add friends"
              icon={addFriendIcon}
              fit
              radius={100}
              paddingLeft={20}
              paddingRight={20}
              bgColor="#26262e"
              iconMove={0}
              action={() => {
                console.log('Adding friend');
              }}
            />
          </View>
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
            {filters.map(item => {
              return (
                <FilterBtn
                  key={useId()}
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
          <View style={styles.friendsListContainer}>
            {filteredFriends && statusFilter === 'Online' &&
              filteredFriends?.filter(f => f.isOnline).length > 0 && (
                <FriendsList />
              )}
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default memo(Friends);
