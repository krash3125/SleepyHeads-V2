import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import tw from '../../lib/tailwind';

const Sounds = ({ soundsBottomSheetRef }) => {
  const snapPoints = useMemo(() => ['92%'], []);
  const [sound, setSound] = useState(0);

  return (
    <BottomSheet
      ref={soundsBottomSheetRef}
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
      <View style={tw`m-4 mt-2 h-5/6 p-2`}>
        <Text style={tw`text-3.5xl font-800 text-sh-dark-blue text-center`}>
          Sounds
        </Text>
        <BouncyCheckbox
          isChecked={sound === 0}
          disableBuiltInState={true}
          text="Sound 1"
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-sh-dark-blue rounded-lg items-center px-4 mt-4`}
          textStyle={tw`text-xl font-600 text-white no-underline tracking-widest`}
          innerIconStyle={tw`border border-[#E98F50]`}
          fillColor="#E98F50"
          onPress={() => setSound(0)}
        />
        <BouncyCheckbox
          isChecked={sound === 1}
          disableBuiltInState={true}
          text="Sound 2"
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-sh-dark-blue rounded-lg items-center px-4 mt-4`}
          textStyle={tw`text-xl font-600 text-white no-underline tracking-widest`}
          innerIconStyle={tw`border border-[#E98F50]`}
          fillColor="#E98F50"
          onPress={() => setSound(1)}
        />
        <BouncyCheckbox
          isChecked={sound === 2}
          disableBuiltInState={true}
          text="Sound 3"
          style={tw`flex flex-row h-14 w-full border border-zinc-800 bg-sh-dark-blue rounded-lg items-center px-4 mt-4`}
          textStyle={tw`text-xl font-600 text-white no-underline tracking-widest`}
          innerIconStyle={tw`border border-[#E98F50]`}
          fillColor="#E98F50"
          onPress={() => setSound(2)}
        />
      </View>
    </BottomSheet>
  );
};

export default Sounds;
