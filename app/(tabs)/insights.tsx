import ListHeading from "@/components/ListHeading";
import ScreenHeader from "@/components/ScreenHeader";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptions } from "@/contexts/SubscriptionsContext";
import { styled } from "nativewind";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Insights = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(3);
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);
  const { subscriptions } = useSubscriptions();
  const data = [
    { value: 35, label: "Mon" },
    { value: 30, label: "Tue" },
    { value: 22, label: "Wed" },
    { value: 40, label: "Thu" },
    { value: 34, label: "Fri" },
    { value: 20, label: "Sat" },
    { value: 24, label: "Sun" },
  ];

  const formattedData = data.map((item, index) => ({
    ...item,
    frontColor: index === selectedIndex ? "#E76F51" : "#0B132B",
    onPress: () => setSelectedIndex(index),
  }));

  return (
    <SafeAreaView
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
      className="flex-1 bg-background "
    >
      <View>
        <FlatList
          data={subscriptions}
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
          ListEmptyComponent={
            <Text className="home-empty-state">No subscription yet.</Text>
          }
          contentContainerClassName="pb-20"
          ListHeaderComponent={() => (
            <>
              <ScreenHeader title="Monthly Insights" />
              <ListHeading
                button_link="/subscriptions"
                button_text="See All"
                title="Upcoming"
              />

              <View className="bg-[#F5E6C8] mb-4 overflow-hidden rounded-2xl p-4">
                <BarChart
                  data={formattedData}
                  barWidth={12}
                  spacing={30}
                  roundedTop
                  roundedBottom
                  // hideRules

                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: "#6b7280" }}
                  noOfSections={4}
                  maxValue={50}
                  // ✅ Show value on selected bar
                  renderTooltip={(item: any, index: number) => {
                    if (index !== selectedIndex) return null;

                    return (
                      <View
                        style={{
                          backgroundColor: "#fff",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 8,
                          marginBottom: 6,
                        }}
                      >
                        <Text style={{ color: "#E76F51", fontWeight: "600" }}>
                          ${item.value}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>

              <ListHeading
                button_link="/subscriptions"
                button_text="See All"
                title="History"
              />
            </>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Insights;
