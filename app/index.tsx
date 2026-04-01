/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function Splash() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <View className="flex-1 justify-center items-center bg-accent ">
      <Image
        source={require("../assets/images/splash-pattern.png")}
        className="w-full h-fit mb-10"
      />

      <View>
        <Text className="text-4xl text-white font-bold mb-2">
          Welcome to Recurly
        </Text>
        <Text className="text-background  text-center mb-6">
          Your all-in-one subscription manager.
        </Text>
        <Pressable
          onPress={() => router.push("/(auth)/sign-in")}
          className="bg-white text-center px-6 py-4 rounded-full"
        >
          <Text className="text-primary text-center font-semibold">
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
