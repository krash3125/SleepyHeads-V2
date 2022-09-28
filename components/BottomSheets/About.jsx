import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import tw from '../../lib/tailwind';

const About = ({ aboutBottomSheetRef }) => {
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
      <BottomSheetScrollView style={tw`m-4 mt-2 h-[95%] p-2`}>
        <Text style={tw`text-3.5xl font-800 text-sh-dark-blue text-center`}>
          About
        </Text>
        <Text
          style={tw`mt-4 text-lg font-300 text-sh-dark-blue text-center leading-[1.7rem]`}
        >
          Every year there are an estimated 100,000 crashes related to drowsy
          driving, which include more than 50,000 injuries and more than 800
          deaths. The issue of drowsy driving is even more prevalent in the
          truck driving industry, due to long hours with continuous driving. The
          American Trucking Association finds that almost one-third of
          commercial truck drivers have mild to severe sleep apnea, making them
          2.5 times as likely to be in an accident with another motor vehicle.
          This drowsy driving leads to mental impairment, and studies show that
          it can take less than two seconds for an accident to occur. To make
          roads safer for all drivers, we created SleepyHeads, an app that uses
          machine learning to determine the state of a driver's eye and alert
          them if they are dosing off.
        </Text>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default About;
