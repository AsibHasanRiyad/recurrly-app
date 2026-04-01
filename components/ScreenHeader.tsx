import { icons } from "@/constants/icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const ScreenHeader = ({ title }: { title: string }) => {
  return (
    <View className="list-head">
      <Pressable className="border-gray-300 rounded-full p-2 border-2">
        <Image className="home-add-icon" source={icons.back} />
      </Pressable>

      <Text className="list-title">{title}</Text>
      <Pressable className="border-gray-300 rounded-full p-2 border-2">
        <Image className="home-add-icon" source={icons.add} />
      </Pressable>
    </View>
  );
};

export default ScreenHeader;
