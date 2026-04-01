import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ListHeading = ({ title, button_text, button_link }: ListHeadingProps) => {
  const router = useRouter();

  return (
    <View className="list-head">
      <Text className="list-title">{title}</Text>

      {button_text && button_link && (
        <TouchableOpacity
          className="list-action"
          onPress={() => router.push(button_link)}
        >
          <Text className="list-action-text">{button_text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ListHeading;
