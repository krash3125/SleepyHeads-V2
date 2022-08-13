import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from '../lib/tailwind';

const DrawerItems = ({ title, icon, onPress }) => {
  return (
    <>
      <TouchableOpacity
        style={tw`flex-row items-center ml-2 mb-6`}
        onPress={onPress}
      >
        <Feather name={icon} size={26} color="#222B45" />
        <Text
          style={tw`ml-4 text-xl font-400 tracking-wider text-sh-dark-blue`}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default DrawerItems;
