/* eslint-disable import/no-named-as-default */
import { tabs } from "@/constants/data";
import clsx from "clsx";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
const TabLayout = () => {
  const TabIcon = ({ focused, icon }: TabIconProps) => {
    return (
      <View className=" tab-icon">
        <View className={clsx("tabs-pill", focused && "tabs-active")}>
          <Image source={icon} className="tabs-glyph" />
        </View>
      </View>
    );
  };
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          key={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
