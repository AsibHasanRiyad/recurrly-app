import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/contexts/SubscriptionsContext";

const SafeAreaView = styled(RNSafeAreaView);

const Subscription = () => {
  const [search, setSearch] = useState("");
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const { subscriptions } = useSubscriptions();

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, subscriptions]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
        <View className="flex-1 p-5">
          {/* ✅ Heading */}
          <Text className="text-primary text-2xl font-bold mb-4">
            All Subscriptions
          </Text>

          {/* 🔍 Search Input */}
          <View className="mb-4">
            <TextInput
              placeholder="Search subscriptions..."
              value={search}
              onChangeText={setSearch}
              className="bg-background placeholder:text-gray-500 rounded-xl px-4 py-3 border border-gray-200"
            />
          </View>

          {/* 📋 Subscription List */}
          <FlatList
            data={filteredSubscriptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SubscriptionCard
                {...item}
                expanded={expandedSubscriptionId === item.id}
                onPress={() =>
                  setExpandedSubscriptionId((currentId) =>
                    currentId === item.id ? null : item.id,
                  )
                }
              />
            )}
            extraData={expandedSubscriptionId}
            ItemSeparatorComponent={() => <View className="h-4" />}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="on-drag" // ✅ dismiss when scrolling
            keyboardShouldPersistTaps="handled" // ✅ allow taps while keyboard open
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-10">
                No subscriptions found.
              </Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Subscription;
