import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import tw from '../../lib/tailwind';

const About = ({ aboutBottomSheetRef }) => {
  // variables
  const snapPoints = useMemo(() => ['92%'], []);

  return (
    <BottomSheet
      ref={aboutBottomSheetRef}
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
      <View style={tw`m-4 mt-2 h-[95%] p-2`}>
        <Text style={tw`text-3.5xl font-800 text-sh-dark-blue text-center`}>
          About
        </Text>
        <Text
          style={tw`mt-4 text-lg font-300 text-sh-dark-blue text-center leading-[1.7rem]`}
        >
          Each year there are an estimated 100,000 crashes related to drowsy
          driving which result in 800 fatalities and about 50,000 injuries. The
          issue of drowsy driving is even more prevalent in the truck driving
          industry. The American Trucking Association finds that almost
          one-third of commercial truck drivers have mild to severe sleep apnea
          making them 2.5 times as likely to be in an accident with another
          motor vehicle. We wanted to make an impact with our project and help
          solve this problem, thereby making roads safer for all drivers. To do
          this, we created SleepyHeads, an app that uses machine learning to
          determine the state of a driver's eye and alert them if they are
          dosing off.
        </Text>
      </View>
    </BottomSheet>
  );
};

export default About;
