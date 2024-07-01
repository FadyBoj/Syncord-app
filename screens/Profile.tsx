import {View, Text} from 'react-native';
import {useState, FC, useContext} from 'react';
import styles from '../styles/ProfileStyles';

//Components
import Header from '../components/Header/Header';
import ImagePlaceHolder from '../components/ImagePlaceHolder/ImagePlaceHolder';
import {DashboardContext} from '../context/DashboardContext';

const Profile: FC = props => {
  const dashboard = useContext(DashboardContext);
  const user = dashboard?.user;

  return (
    <>
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
                  size={120}
                  fontSize={10}
                />
              </View>
            </View>
            {/* Row 2 */}
            <View style={styles.row2}>
              <View style={styles.nameContainer}>
                <Text style={styles.firstName}>{user.firstname}</Text>
                <Text style={styles.id}>{user.id}</Text>
              </View>
              <View style={styles.btnsContainer}>

              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Profile;
