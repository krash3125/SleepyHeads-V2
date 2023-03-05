import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import tw from '../../lib/tailwind';

const Help = ({ helpBottomSheetRef }) => {
  const snapPoints = useMemo(() => ['80%'], []);

  return (
    <BottomSheet
      ref={helpBottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enableOverDrag={false}
      enablePanDownToClose={true}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0}
          enableTouchThrough={false}
          disappearsOnIndex={-1}
        />
      )}
    >
      <View style={tw`flex-1 p-2`}>
        <BottomSheetScrollView>
          <View style={tw`m-4 mt-2`}>
            <Text style={tw`text-3.5xl font-800 text-sh-dark-blue text-center`}>
              Help
            </Text>
            <Text
              style={tw`mt-4 text-xl font-400 text-sh-dark-blue text-center`}
            >
              Keep face in the camera view to enable sleep detection. When your
              eyes close an alarm will play to alert you.
            </Text>
            <Text
              style={tw`mt-8 text-2xl font-600 text-sh-dark-blue text-center`}
            >
              These alerts will notify you on your status:
            </Text>
            <View style={tw`mx-10 mt-4 mb-3`}>
              <View
                style={tw`h-12 w-full justify-center items-center border-2 border-slate-800 rounded-lg bg-green-500 mt-4`}
              >
                <Text style={tw`text-lg font-600 text-sh-dark-blue`}>
                  Eyes Open
                </Text>
              </View>
              <View
                style={tw`h-12 w-full justify-center items-center border-2 border-slate-800 rounded-lg bg-yellow-500 mt-4`}
              >
                <Text style={tw`text-lg font-600 text-sh-dark-blue`}>
                  Face Not Detected
                </Text>
              </View>
              <View
                style={tw`h-12 w-full justify-center items-center border-2 border-slate-800 rounded-lg bg-red-500 mt-4`}
              >
                <Text style={tw`text-lg font-600 text-sh-dark-blue`}>
                  Eyes Closed
                </Text>
              </View>
            </View>
            <Text
              style={tw`mt-4 text-xl font-800 text-sh-dark-blue text-center`}
            >
              This app isn't something you can rely on 100% of the time, but
              instead acts as an added layer of security.
            </Text>
          </View>
        </BottomSheetScrollView>
      </View>
    </BottomSheet>
  );
};

export default Help;
