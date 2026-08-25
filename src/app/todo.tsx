import { useState } from "react";
import { View, Text, Pressable, TextInput, FlatList, SafeAreaView } from "react-native";

type Task = {
  id: string;
  label: string;
  tag: string;
  tagColor: string;
  done: boolean;
};

const initialTasks: Task[] = [
  { id: "1", label: "Reply to Priya's message", tag: "AI", tagColor: "bg-green-700", done: false },
  { id: "2", label: "Submit hackathon deck", tag: "Today", tagColor: "bg-orange-500", done: false },
  { id: "3", label: "Buy groceries", tag: "Done", tagColor: "bg-neutral-400", done: true },
  { id: "4", label: "Prep demo video script", tag: "Tomorrow", tagColor: "bg-indigo-400", done: false },
];

const filters = ["All", "Today", "Done"] as const;
type Filter = (typeof filters)[number];

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("All");
  const [input, setInput] = useState("");

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = () => {
    if (!input.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        label: input.trim(),
        tag: "Today",
        tagColor: "bg-orange-500",
        done: false,
      },
    ]);
    setInput("");
  };

  const visibleTasks = tasks.filter((t) => {
    if (filter === "Today") return !t.done;
    if (filter === "Done") return t.done;
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-4 pb-3">
        <Text className="text-xl font-semibold text-neutral-900">Tasks</Text>
        <Pressable
          onPress={addTask}
          className="w-8 h-8 rounded-full bg-neutral-900 items-center justify-center active:opacity-80"
        >
          <Text className="text-white text-base">+</Text>
        </Pressable>
      </View>

      {/* Filter tabs */}
      <View className="flex-row gap-2 px-5 pb-4">
        {filters.map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full ${
              filter === f ? "bg-neutral-900" : "bg-neutral-100"
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                filter === f ? "text-white" : "text-neutral-500"
              }`}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Sync note */}
      <View className="mx-5 mb-3 bg-green-50 rounded-xl px-3 py-2">
        <Text className="text-[11px] text-green-800">
          Synced from Chat · added by NeuroPocket
        </Text>
      </View>

      {/* Task list */}
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            className="flex-row items-center gap-3 bg-neutral-50 rounded-xl px-3.5 py-3.5"
          >
            <View
              className={`w-[18px] h-[18px] rounded-md ${
                item.done ? "bg-green-700" : "border-[1.5px] border-neutral-300"
              }`}
            />
            <Text
              className={`flex-1 text-[13px] ${
                item.done ? "text-neutral-400 line-through" : "text-neutral-900"
              }`}
            >
              {item.label}
            </Text>
            <View className={`rounded-lg px-2 py-0.5 ${item.tagColor}`}>
              <Text className="text-[10px] font-medium text-white">
                {item.tag}
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* Add task bar */}
      <View className="flex-row items-center gap-2.5 px-4 pt-3 pb-5">
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={addTask}
          placeholder="Add a task or ask AI to add one"
          placeholderTextColor="#9ca3af"
          className="flex-1 bg-neutral-100 rounded-full px-4 py-3 text-xs text-neutral-900"
        />
        <Pressable
          onPress={addTask}
          className="w-10 h-10 rounded-full bg-neutral-900 items-center justify-center active:opacity-80"
        />
      </View>
    </SafeAreaView>
  );
}