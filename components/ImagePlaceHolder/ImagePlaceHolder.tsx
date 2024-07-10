import {View, Text, Image, StyleSheet} from 'react-native';
import {FC} from 'react';
import FastImage from 'react-native-fast-image';

interface Props {
  size: number;
  fontSize: number;
  image: string;
  firstname: string;
  lastname: string;
}

const ImagePlaceHolder: FC<Props> = ({
  firstname,
  lastname,
  image,
  size,
  fontSize,
}) => {
  const styles = StyleSheet.create({
    profilePicContainer: {
      position: 'relative',
      width: size,
    },
    profilePic: {
      width: size,
      height: size,
      objectFit:'contain',
      borderRadius: 100,
    },
    previewInfo: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      gap: 13,
    },
    nameId: {
      flexDirection: 'column',
      gap: 3,
    },
    nameText: {
      fontFamily: 'Roboto',
      color: 'white',
      fontSize: 16,
    },
    idText: {
      fontFamily: 'Roboto',
      color: 'gray',
      fontSize: 12,
      width: '80%',
    },
    logEditContainer: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'space-between',
    },
    imagePlaceHolder: {
      width: size,
      height: size,
      borderRadius: 100,
      backgroundColor: '#6441A5',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pfpText: {
      fontFamily: 'Roboto',
      color: 'white',
      fontSize: fontSize,
    },
  });
  return (
    <View style={styles.profilePicContainer}>
      {image ? (
        <FastImage
          source={{
            uri: image.replace('http', 'https'),
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.profilePic}
        />
      ) : (
        <View style={styles.imagePlaceHolder}>
          <Text allowFontScaling={false} style={styles.pfpText}>
            {firstname[0].toLocaleUpperCase()}
          </Text>
          <Text allowFontScaling={false} style={styles.pfpText}>
            {lastname[0].toLocaleUpperCase()}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ImagePlaceHolder;
