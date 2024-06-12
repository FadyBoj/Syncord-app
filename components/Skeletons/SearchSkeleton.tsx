import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SearchSkeleton = () => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <SkeletonPlaceholder
          backgroundColor="#2b2b33"
          highlightColor="#848494"
          speed={1000}>
          <View style={styles.content}>
            <View style={styles.userCont}>
              <View>
                <SkeletonPlaceholder.Item
                  width={40}
                  height={40}
                  borderRadius={100}
                />
              </View>
              <View style={styles.col2}>
                <SkeletonPlaceholder.Item
                  width={170}
                  height={15}
                  borderRadius={12}
                />
                <SkeletonPlaceholder.Item
                  width={90}
                  height={15}
                  borderRadius={12}
                />
              </View>
            </View>
            <View style={styles.userCont}>
              <View>
                <SkeletonPlaceholder.Item
                  width={40}
                  height={40}
                  borderRadius={100}
                />
              </View>
              <View style={styles.col2}>
                <SkeletonPlaceholder.Item
                  width={170}
                  height={15}
                  borderRadius={12}
                />
                <SkeletonPlaceholder.Item
                  width={90}
                  height={15}
                  borderRadius={12}
                />
              </View>
            </View>
            <View style={styles.userCont}>
              <View>
                <SkeletonPlaceholder.Item
                  width={40}
                  height={40}
                  borderRadius={100}
                />
              </View>
              <View style={styles.col2}>
                <SkeletonPlaceholder.Item
                  width={170}
                  height={15}
                  borderRadius={12}
                />
                <SkeletonPlaceholder.Item
                  width={90}
                  height={15}
                  borderRadius={12}
                />
              </View>
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: 0,
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#26272e',
    borderRadius: 12,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  userCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  col2: {
    flexDirection: 'column',
    gap: 10,
  },
  content: {
    gap: 20,
  },
});

export default SearchSkeleton;
