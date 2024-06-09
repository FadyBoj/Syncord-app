import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ChatSkeleton = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.sv}>
        <SkeletonPlaceholder backgroundColor='#2b2b33' highlightColor='#848494' speed={1000}>
          <View style={{gap: 15}}>
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
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={250} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={279} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={160} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={50} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={170} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={106} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={80} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={110} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={240} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
              </View>
            </View>
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
                <SkeletonPlaceholder.Item width={100} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
                <SkeletonPlaceholder.Item width={200} height={16} borderRadius={20} />
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

export default ChatSkeleton;
