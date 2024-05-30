import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useContext, FC} from 'react';
import { DashboardContext } from '../../context/DashboardContext';

interface Props {
  openDrawer: () => void;
  title?: string;
}

const Header: FC<Props> = ({openDrawer, title = false}) => {
  const user = useContext(DashboardContext)?.user;

  return (
    <View style={styles.container}>
      <View style={styles.secContainer}>
        <TouchableOpacity
          onPress={openDrawer}
          style={styles.profilePicContainer}>
          <>
            {user && user.image  ? (
              <Image source={{uri: user?.image}} style={styles.profilePic} />
            ) : (
              <View style={styles.imagePlaceHolder}>
                <Text style={styles.pfpText}>
                  {user?.firstname[0].toLocaleUpperCase()}
                </Text>
                <Text style={styles.pfpText}>
                  {user?.lastname[0].toLocaleUpperCase()}
                </Text>
              </View>
            )}
          </>
        </TouchableOpacity>
        <View>
          <Text style={styles.welcomeText}>{user?.firstname}</Text>
        </View>
      </View>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111216',
    padding: 17,
  },
  secContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    position: 'absolute',
    left: 17,
    top:17
  },
  profilePicContainer: {
    position: 'relative',
    width: 60,
  },
  profilePic: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 100,
  },
  imagePlaceHolder: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#6441A5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 20,
  },
  welcomeText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 0
  },

  titleContainer:{
    width:'100%',
    alignItems:'center',
    justifyContent:"center",
    paddingTop:17
  },
  titleText:{
    color:'white',
    fontFamily:'Roboto',
  fontSize:18
  }
});

export default Header;
