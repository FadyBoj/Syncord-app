import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const NotificationSkeleton = () => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.sv}>
        <SkeletonPlaceholder
          backgroundColor="#2b2b33"
          highlightColor="#848494"
          speed={1000}>
          <View style={{gap: 30}}>
            <View
              style={{flexDirection: 'row', alignItems: 'flex-start', gap: 15}}>
              <View>
                <SkeletonPlaceholder.Item
                  width={45}
                  height={45}
                  borderRadius={100}
                />
              </View>
              <View
                style={{gap: 10, paddingTop: 10, justifyContent: 'flex-start'}}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.7}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.7}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.7}
                  height={16}
                  borderRadius={20}
                />
              </View>
            </View>
            {/* Second */}
            <View
              style={{flexDirection: 'row', alignItems: 'flex-start', gap: 15}}>
              <View>
                <SkeletonPlaceholder.Item
                  width={45}
                  height={45}
                  borderRadius={100}
                />
              </View>
              <View
                style={{gap: 10, paddingTop: 10, justifyContent: 'flex-start'}}>
                <SkeletonPlaceholder.Item
                  width={140}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.5}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.3}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.6}
                  height={16}
                  borderRadius={20}
                />
              </View>
            </View>

            {/* Third */}
            <View
              style={{flexDirection: 'row', alignItems: 'flex-start', gap: 15}}>
              <View>
                <SkeletonPlaceholder.Item
                  width={45}
                  height={45}
                  borderRadius={100}
                />
              </View>
              <View
                style={{gap: 10, paddingTop: 10, justifyContent: 'flex-start'}}>
                <SkeletonPlaceholder.Item
                  width={200}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.2}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.5}
                  height={16}
                  borderRadius={20}
                />
                <SkeletonPlaceholder.Item
                  width={screenWidth * 0.7}
                  height={16}
                  borderRadius={20}
                />
              </View>
            </View>
          </View>
        </SkeletonPlaceholder>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 200,
    paddingTop: 25,
    paddingLeft: 20,
    backgroundColor: '#111216',
  },
  sv: {
    flex: 1,
  },
});

export default NotificationSkeleton;
