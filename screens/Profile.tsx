import {View, Text} from 'react-native';
import {useState, FC, useContext} from 'react';
import styles from '../styles/ProfileStyles';
import {DashboardContext} from '../context/DashboardContext';

//Components
import Header from '../components/Header/Header';
import ImagePlaceHolder from '../components/ImagePlaceHolder/ImagePlaceHolder';
import ShrinkBtn from '../components/Buttons/ShrinkButton/index';
import LogoutModal from '../components/CustomModals/LogoutModal';

//Utils
import getMonthYear from '../utils/getMonthYear';

//Assets
import editIcon from '../assets/edit.png';
import logoutIcon from '../assets/logout.png';

const Profile: FC = props => {
  const dashboard = useContext(DashboardContext);
  const user = dashboard?.user;

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  return (
    <View style={styles.wrapper}>
      <Header title="Profile" bgColor="black" />
      {user && (
        <View style={styles.container}>
          <View style={styles.mainContent}>
            {/* Row 1 */}
            <View style={styles.row1}>
              <View style={styles.imageContainer}>
                <ImagePlaceHolder
                  firstname={user.firstname}
                  lastname={user.lastname}
                  image={user.image}
                  size={100}
                  fontSize={40}
                />
              </View>
            </View>
            {/* Row 2 */}
            <View style={styles.row2}>
              <View style={styles.nameContainer}>
                <Text style={styles.firstName}>{user.firstname}</Text>
                <Text style={styles.id}>{user.id}</Text>
                <Text style={styles.id}>{user.email}</Text>
              </View>
              <View style={styles.btnsContainer}>
                <ShrinkBtn
                  label="Edit profile"
                  action={() => {
                    console.log('Editing');
                  }}
                  bgColor="#5865f2"
                  width={140}
                  radius={12}
                  icon={editIcon}
                  padding={0}
                />
              </View>
            </View>
            {/* Row3 */}
            <View style={styles.row3}>
              <Text style={styles.memberText}>Syncord member since</Text>
              <Text style={styles.memberDate}>
                {getMonthYear(user.createdAt.toString())}
              </Text>
            </View>
            {/* Row 4 */}
            <ShrinkBtn
              label="Logout"
              bgColor="#2c2c34"
              radius={15}
              action={openLogoutModal}
              icon={logoutIcon}
              iconMove={2}
            />

            {/* <View style={styles.row3}>
  
            </View> */}
          </View>
        </View>
      )}
      {isLogoutModalOpen && <LogoutModal  closeModal={closeLogoutModal} />}
    </View>
  );
};

export default Profile;
