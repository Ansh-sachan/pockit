import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDrawer } from "../context/DrawerContext";

type MenuItem = {
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  badge?: string;
  badgeColor?: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    route: "/",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    label: "Tasks & To-Dos",
    route: "/todo",
    icon: "checkbox-outline",
    activeIcon: "checkbox",
    badge: "Synced",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    label: "AI Chat",
    route: "/chat",
    icon: "chatbubble-ellipses-outline",
    activeIcon: "chatbubble-ellipses",
  },
  {
    label: "Notifications Summary",
    route: "/notificationsum",
    icon: "notifications-outline",
    activeIcon: "notifications",
    badge: "3 items",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    label: "Screen Time & Focus",
    route: "/wellbeing",
    icon: "stats-chart-outline",
    activeIcon: "stats-chart",
  },
  {
    label: "Choose AI Model",
    route: "/model-picker",
    icon: "hardware-chip-outline",
    activeIcon: "hardware-chip",
  },
  {
    label: "Settings",
    route: "/settings",
    icon: "settings-outline",
    activeIcon: "settings",
  },
];

export default function Sidebar() {
  const { isOpen, closeDrawer } = useDrawer();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    closeDrawer();
    if (pathname !== route) {
      router.push(route as any);
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={closeDrawer}
      presentationStyle="overFullScreen"
      style={{ width: "150%", height: "100%" }}
    >
      {/* Backdrop */}
      <View className="flex-1 flex-row bg-black/50">
        <View className="w-2/5 bg-white h-full shadow-2xl flex-1 justify-between">
          <SafeAreaView className="flex-1">
            {/* Sidebar Header */}
            <View className="px-5 pt-4 pb-4 border-b border-neutral-100 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#242424]">
                  <Ionicons name="sparkles-outline" size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-neutral-900">
                    NeuroPocket
                  </Text>
                  <Text className="text-[11px] text-green-700 font-medium">
                    ● On-device AI
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={closeDrawer}
                className="w-8 h-8 rounded-full bg-neutral-100 items-center justify-center active:bg-neutral-200"
              >
                <Ionicons name="close-outline" size={20} color="#525252" />
              </Pressable>
            </View>

            {/* Menu Items */}
            <ScrollView
              className="flex-1 px-3 py-3"
              showsVerticalScrollIndicator={false}
            >
              <Text className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                Navigation
              </Text>

              {menuItems.map((item) => {
                const isActive =
                  pathname === item.route ||
                  (item.route !== "/" && pathname.startsWith(item.route));

                return (
                  <Pressable
                    key={item.route}
                    onPress={() => handleNavigate(item.route)}
                    className={`flex-row items-center justify-between px-3.5 py-3 mb-1 rounded-xl active:opacity-80 ${isActive ? "bg-neutral-900" : "bg-transparent hover:bg-neutral-50"
                      }`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Ionicons
                        name={isActive ? item.activeIcon : item.icon}
                        size={20}
                        color={isActive ? "#FFFFFF" : "#525252"}
                      />
                      <Text
                        className={`text-sm font-medium ${isActive ? "text-white" : "text-neutral-700"
                          }`}
                      >
                        {item.label}
                      </Text>
                    </View>

                    {item.badge && (
                      <View className={`px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        <Text className="text-[10px] font-semibold">
                          {item.badge}
                        </Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Sidebar Footer Card */}
            <View className="p-4 border-t border-neutral-100 bg-neutral-50 m-3 rounded-2xl">
              <View className="flex-row items-center justify-between mb-1.5">
                <Text className="text-xs font-semibold text-neutral-800">
                  Active AI Model
                </Text>
                <View className="bg-green-100 rounded-full px-2 py-0.5">
                  <Text className="text-[10px] font-medium text-green-800">
                    Offline
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-neutral-500 mb-2">
                Llama 3.2 1B (700 MB)
              </Text>
              <Pressable
                onPress={() => handleNavigate("/model-picker")}
                className="bg-white border border-neutral-200 py-1.5 px-3 rounded-lg items-center active:bg-neutral-100"
              >
                <Text className="text-[11px] font-medium text-neutral-700">
                  Switch Model
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>

        {/* Touch outside to close drawer */}
        <Pressable className="flex-1" onPress={closeDrawer} />
      </View>
    </Modal>
  );
}
