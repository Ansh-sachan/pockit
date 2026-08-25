import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModelScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 rounded-[35px] bg-white px-5">

        {/* Header */}
        <View className="flex-row items-center py-5">
          <Pressable className="mr-4 h-10 w-10 items-center justify-center">
            <Text className="text-[32px] text-black">‹</Text>
          </Pressable>

          <Text className="text-[26px] font-medium text-black">
            Choose a model
          </Text>
        </View>

        {/* Device detected */}
        <View className="rounded-[20px] bg-[#f1f1ef] px-6 py-5">
          <Text className="text-[18px] text-[#858585]">
            Device detected
          </Text>

          <Text className="mt-1 text-[21px] text-black">
            iQOO 15 · 12 GB RAM · Snapdragon
          </Text>
        </View>

        {/* Models */}
        <View className="mt-8">

          {/* Llama */}
          <View className="rounded-[20px] border-2 border-[#222222] px-6 py-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-[23px] text-black">
                Llama 3.2 1B
              </Text>

              <View className="rounded-full bg-[#eaf1e7] px-4 py-2">
                <Text className="text-[16px] text-[#46683e]">
                  Recommended
                </Text>
              </View>
            </View>

            <Text className="mt-2 text-[19px] text-[#888888]">
              700 MB · fast, lighter reasoning
            </Text>
          </View>

          {/* Gemma */}
          <View className="mt-4 rounded-[20px] border border-[#dddddd] px-6 py-5">
            <Text className="text-[23px] text-black">
              Gemma 2 2B
            </Text>

            <Text className="mt-2 text-[19px] text-[#888888]">
              1.4 GB · balanced
            </Text>
          </View>

          {/* Phi */}
          <View className="mt-4 rounded-[20px] border border-[#dddddd] px-6 py-5">
            <Text className="text-[23px] text-black">
              Phi-3 mini
            </Text>

            <Text className="mt-2 text-[19px] text-[#888888]">
              2.1 GB · stronger reasoning, slower
            </Text>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}