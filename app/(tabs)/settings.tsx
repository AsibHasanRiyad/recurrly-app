import images from "@/constants/images";
import { useClerk, useUser } from "@clerk/expo";
import { styled } from "nativewind";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-background p-5 justify-center items-center">
        <Text className="text-base text-gray-500">
          Loading account settings...
        </Text>
      </SafeAreaView>
    );
  }

  const fullName =
    user.fullName ||
    (user.firstName || user.lastName
      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
      : "Unknown User");
  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses?.[0]?.emailAddress ??
    "No email";
  const joinedAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "Unknown";
  const lastSigned = user.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleString()
    : "Never";

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="mb-4 rounded-2xl bg-surface p-4 shadow-sm">
        <View className="flex-row items-center">
          <Image
            source={{ uri: user.imageUrl || images.avatar }}
            className="h-18 w-18 rounded-full"
          />
          <View className="ml-3 flex-1">
            <Text className="text-xl font-bold text-primary">{fullName}</Text>
            <Text className="text-base text-gray-500">{email}</Text>
          </View>
        </View>
      </View>

      <View className="mb-5 rounded-2xl bg-surface p-4 shadow-sm">
        <Text className="mb-3 text-base font-bold text-gray-700">
          Account information
        </Text>

        <View className="space-y-3">
          <View className="flex-row justify-between">
            <Text className="text-base text-gray-600">Account ID</Text>
            <Text
              className="text-base text-gray-800 wrap-break-word"
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {user.id}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-base text-gray-600">Joined</Text>
            <Text className="text-base text-gray-800">{joinedAt}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-base text-gray-600">Last sign-in</Text>
            <Text className="text-base text-gray-800">{lastSigned}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-base text-gray-600">Password enabled</Text>
            <Text className="text-base text-gray-800">
              {user.passwordEnabled ? "Yes" : "No"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-base text-gray-600">Two-factor enabled</Text>
            <Text className="text-base text-gray-800">
              {user.twoFactorEnabled ? "Yes" : "No"}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => signOut()}
        className="rounded-xl bg-accent py-4 items-center"
      >
        <Text className="text-white text-lg font-bold">Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;
