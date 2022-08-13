import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import tw from '../../lib/tailwind';

const Help = ({ helpBottomSheetRef }) => {
  // variables
  const snapPoints = useMemo(() => ['95%'], []);

  return (
    <BottomSheet
      ref={helpBottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.7}
          enableTouchThrough={false}
          disappearsOnIndex={-1}
        />
      )}
    >
      <View style={tw`m-4 h-5/6 p-2`}>
        <Text style={tw`text-3.5xl font-800 text-sh-dark-blue text-center`}>
          Sounds
        </Text>
        <View
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-[#E65C4FCC] rounded-lg items-center px-4 mt-4`}
        >
          <Text style={tw`text-xl font-600 text-sh-dark-blue `}>Sound 1</Text>
        </View>
        <View
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-[#E65C4FCC] rounded-lg items-center px-4 mt-4`}
        >
          <Text style={tw`text-xl font-600 text-sh-dark-blue `}>Sound 1</Text>
        </View>
        <View
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-[#E65C4FCC] rounded-lg items-center px-4 mt-4`}
        >
          <Text style={tw`text-xl font-600 text-sh-dark-blue `}>Sound 1</Text>
        </View>
        <View
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-[#E65C4FCC] rounded-lg items-center px-4 mt-4`}
        >
          <Text style={tw`text-xl font-600 text-sh-dark-blue `}>Sound 1</Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default Help;
