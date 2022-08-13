import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import tw from '../../lib/tailwind';

import { BlurView } from 'expo-blur';

const Sounds = ({ soundsBottomSheetRef, setAnyBottomSheetOpen }) => {
  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);

  return (
    <BottomSheet
      ref={soundsBottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={(index) => {
        if (index !== -1) {
          setAnyBottomSheetOpen(true);
        } else {
          setAnyBottomSheetOpen(false);
        }
      }}
      backdropComponent={() => (
        <>
          <BottomSheetBackdrop animatedIndex={1} appearsOnIndex={2} />
        </>
      )}
    >
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheet>
  );
};

export default Sounds;
