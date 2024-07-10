import {View, Text, Image, Pressable, Platform} from 'react-native';
import {useState, FC, useContext} from 'react';
import styles from '../styles/ProfileStyles';
import {DashboardContext} from '../context/DashboardContext';
import ImagePicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import axios from 'axios';
import globals from '../globals';

//Components
import Header from '../components/Header/Header';
import ImagePlaceHolder from '../components/ImagePlaceHolder/ImagePlaceHolder';
import ShrinkBtn from '../components/Buttons/ShrinkButton/index';
import LogoutModal from '../components/CustomModals/LogoutModal';
import SingleBackDrop from '../components/Backdrop/SingleBackDrop';

//Utils
import getMonthYear from '../utils/getMonthYear';

//Assets
import editIcon from '../assets/edit.png';
import logoutIcon from '../assets/logout.png';
import cameraIcon from '../assets/camera.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile: FC = props => {
  const dashboard = useContext(DashboardContext);
  const user = dashboard?.user;
  const setUser = dashboard?.setUser;

  const [isUploading, setIsUploading] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleUploadPic = () => {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      if (result === RESULTS.GRANTED) {
        console.log('Granted');
        return;
      }
      setIsUploading(true);
      request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(res => {
          setIsUploading(false);
          ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
            mediaType: 'photo',
            freeStyleCropEnabled: true,
            cropperCircleOverlay: true,
            showCropFrame: false,
            showCropGuidelines: false,
          }).then(image => {
            if (!image.path || !setUser) return;
            const uploadImage = async () => {
              try {
                setIsUploading(true);
                const token = await AsyncStorage.getItem('token');
                if (!token) return;
                //Creating a multipart form data
                const imageData = new FormData();
                imageData.append('image', {
                  uri: image.path,
                  type: image.mime || 'image/jpeg',
                  name: 'photo.jpg',
                });

                const response = await axios.post(
                  `${globals.baseUrl}/user/upload-image`,
                  imageData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'multipart/form-data',
                    },
                  },
                );

                //Update local user image UI
                setUser(prevData => {
                  if (!prevData) return null;
                  return {...prevData, image: image.path};
                });
                ImagePicker.clean()
                  .then(() => {
                    console.log('removed all tmp images from tmp directory');
                  })
                  .catch(e => {
                    console.log("Couldn't clean temp files");
                  });
                //Removing spinner
                setIsUploading(false);
              } catch (error: any) {
                setIsUploading(false);
                console.log(error);
              }
            };
            uploadImage();
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return (
    <View style={styles.wrapper}>
      <Header title="Profile" bgColor="black" />
      {user && (
        <View style={styles.container}>
          <View style={styles.mainContent}>
            {/* Row 1 */}
            <View style={styles.row1}>
              <View style={styles.imageContainer}>
                <Pressable
                  onPress={handleUploadPic}
                  style={styles.imageContainerContent}>
                  <ImagePlaceHolder
                    firstname={user.firstname}
                    lastname={user.lastname}
                    image={user.image}
                    size={100}
                    fontSize={40}
                  />
                  <View style={styles.cameraIconContainer}>
                    <Image source={cameraIcon} style={styles.cameraIcon} />
                  </View>
                </Pressable>
              </View>
            </View>
            {/* Row 2 */}
            <View style={styles.row2}>
              <View style={styles.nameContainer}>
                <Text allowFontScaling={false} style={styles.firstName}>
                  {user.firstname}
                </Text>
                <Text allowFontScaling={false} style={styles.id}>
                  {user.id}
                </Text>
                <Text allowFontScaling={false} style={styles.id}>
                  {user.email}
                </Text>
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
              <Text allowFontScaling={false} style={styles.memberText}>
                Syncord member since
              </Text>
              <Text allowFontScaling={false} style={styles.memberDate}>
                {getMonthYear(user.createdAt.toString())}
              </Text>
            </View>
            {/* Row 4 */}
            <View style={styles.row4}>
              <ShrinkBtn
                label="Logout"
                bgColor="#2c2c34"
                radius={15}
                action={openLogoutModal}
                icon={logoutIcon}
                iconMove={2}
                fullWidth
              />
            </View>

            {/* <View style={styles.row3}>
  
            </View> */}
          </View>
        </View>
      )}
      {isLogoutModalOpen && <LogoutModal closeModal={closeLogoutModal} />}
      {isUploading && <SingleBackDrop spinner />}
    </View>
  );
};

export default Profile;
