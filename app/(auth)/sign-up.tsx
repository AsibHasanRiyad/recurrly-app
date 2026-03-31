import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SignUpPage() {
  const { isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleSubmit = async () => {
    const { error } = await signUp.password({ emailAddress, password });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) {
      await signUp.verifications.sendEmailCode();
    }
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code });
    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.push(url as any);
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  if (isSignedIn) {
    void router.push("/(tabs)");
    return null;
  }

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields?.includes("email_address") &&
    signUp.missingFields?.length === 0
  ) {
    return (
      <View className="flex-1 flex-col items-center justify-center bg-background p-6">
        {/* Logo and Branding Section */}
        <View className="mb-12">
          <View className="flex-row items-center justify-center gap-3 mb-8">
            <View className="w-16 h-16 bg-accent rounded-tr-2xl rounded-bl-2xl flex items-center justify-center">
              <Text className="text-white text-3xl font-sans-bold">R</Text>
            </View>
            <View>
              <Text className="text-3xl font-sans-bold text-[#1a1a1a]">
                Recurly
              </Text>
              <Text
                className="text-xs text-[#666] font-sans-semibold"
                style={{ letterSpacing: 2 }}
              >
                SMART BILLING
              </Text>
            </View>
          </View>
        </View>

        {/* Verify Section */}
        <View className="mb-10">
          <Text className="text-4xl font-sans-bold text-[#1a1a1a] mb-3 text-center">
            Verify your account
          </Text>
        </View>

        {/* Form Card */}
        <View className="w-full max-w-md p-8 bg-[#FFF7E5] border border-[#e6e3e1] rounded-xl">
          <View className="gap-6">
            <TextInput
              className="w-full h-12 px-4 text-lg border border-[#d4c9be] rounded-lg bg-background text-[#1a1a1a] placeholder:pb-1.5 placeholder:text-[#888]"
              value={code}
              placeholder="Enter your verification code"
              onChangeText={setCode}
              keyboardType="numeric"
            />
            {errors.fields?.code && (
              <Text className="text-xs text-destructive mt-1">
                {errors.fields.code.message}
              </Text>
            )}
            <Pressable
              className={`w-full h-14 bg-[#e07856] rounded-xl flex items-center justify-center ${
                fetchStatus === "fetching" ? "opacity-50" : ""
              }`}
              onPress={handleVerify}
              disabled={fetchStatus === "fetching"}
            >
              <Text className="text-white text-lg font-sans-semibold">
                Verify
              </Text>
            </Pressable>
            <Pressable
              className="w-full h-14 border border-[#d4c9be] rounded-xl flex items-center justify-center"
              onPress={() => signUp.verifications.sendEmailCode()}
            >
              <Text className="text-[#e07856] text-lg font-sans-semibold">
                I need a new code
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 flex-col items-center justify-center px-6 py-8">
          {/* Logo and Branding Section */}
          <View className="mb-12">
            <View className="flex-row items-center justify-center gap-3 mb-8">
              <View className="w-16 h-16 bg-accent rounded-tr-2xl rounded-bl-2xl flex items-center justify-center">
                <Text className="text-white text-3xl font-sans-bold">R</Text>
              </View>
              <View>
                <Text className="text-3xl font-sans-bold text-[#1a1a1a]">
                  Recurly
                </Text>
                <Text
                  className="text-xs text-[#666] font-sans-semibold"
                  style={{ letterSpacing: 2 }}
                >
                  SMART BILLING
                </Text>
              </View>
            </View>
          </View>

          {/* Welcome Section */}
          <View className="mb-10">
            <Text className="text-4xl font-sans-bold text-[#1a1a1a] mb-3 text-center">
              Create your account
            </Text>
            <Text className="text-lg text-[#555] text-center">
              Start managing your subscriptions today
            </Text>
          </View>

          {/* Form Card */}
          <View className="w-full max-w-md p-8 bg-[#FFF7E5] border border-[#e6e3e1] rounded-xl">
            <View className="gap-6">
              {/* Email Field */}
              <View>
                <Text className="text-lg font-sans-semibold text-[#1a1a1a] mb-3">
                  Email
                </Text>
                <TextInput
                  className="w-full h-12 px-4 text-lg border border-[#d4c9be] rounded-lg bg-background text-[#1a1a1a] placeholder:pb-1.5 placeholder:text-[#888]"
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter your email"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                />
                {errors.fields?.emailAddress && (
                  <View className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <Text className="text-sm text-red-600 font-sans-semibold">
                      ⚠️ {errors.fields.emailAddress.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* Password Field */}
              <View>
                <Text className="text-lg font-sans-semibold text-[#1a1a1a] mb-3">
                  Password
                </Text>
                <TextInput
                  className="w-full h-12 px-4 text-lg border border-[#d4c9be] rounded-lg bg-background text-[#1a1a1a] placeholder:pb-1.5 placeholder:text-[#888]"
                  value={password}
                  placeholder="Enter your password"
                  secureTextEntry
                  onChangeText={setPassword}
                />
                {errors.fields?.password && (
                  <View className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <Text className="text-sm text-red-600 font-sans-semibold">
                      ⚠️ {errors.fields.password.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* Sign Up Button */}
              <Pressable
                className={`w-full h-14 bg-[#e07856] rounded-xl flex items-center justify-center ${
                  !emailAddress || !password || fetchStatus === "fetching"
                    ? "opacity-50"
                    : ""
                }`}
                onPress={handleSubmit}
                disabled={
                  !emailAddress || !password || fetchStatus === "fetching"
                }
              >
                <Text className="text-white text-lg font-sans-semibold">
                  {fetchStatus === "fetching"
                    ? "Creating account..."
                    : "Create account"}
                </Text>
              </Pressable>
            </View>

            {/* Sign In Link */}
            <View className="mt-6 flex-row justify-center items-center">
              <Text className="text-[#555] text-base">
                Already have an account?{" "}
              </Text>
              <Link
                href="/(auth)/sign-in"
                className="text-[#e07856] font-sans-semibold"
              >
                Sign in
              </Link>
            </View>

            <View nativeID="clerk-captcha" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
