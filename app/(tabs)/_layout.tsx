import { Tabs } from "expo-router";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTranslation } from 'react-i18next';

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="list"
        options={{
          tabBarLabel: t("List"),
          title: t("List"),
          tabBarIcon: () => <MaterialCommunityIcons name="format-list-bulleted" size={30} color={'#402e69'} />,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="goods"
        options={{
          tabBarLabel: t("Goods"),
          title: t("Goods"),
          tabBarIcon: () => <MaterialCommunityIcons name="rhombus-split" size={30} color={'#402e69'} />,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      />
    </Tabs>
  );
}