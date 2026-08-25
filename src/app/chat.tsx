import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Summarize my notifications from today",
  },
  {
    id: "2",
    role: "assistant",
    text: "You had 12 notifications. 3 need action: a payment reminder, a meeting shift, and a message from Priya asking about the deck.",
  },
];

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <View
      className={`max-w-[80%] rounded-2xl px-4 py-2.5 mb-3 ${
        isUser
          ? "bg-neutral-900 self-end"
          : "bg-neutral-100 self-start"
      }`}
    >
      <Text
        className={`text-[13px] leading-5 ${
          isUser ? "text-white" : "text-neutral-900"
        }`}
      >
        {message.text}
      </Text>
    </View>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // TODO: replace with real llama.rn completion call
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "I am running locally on your device with zero internet connection.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 400);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* App Header with sidebar drawer access and status */}
      <AppHeader
        title="AI Chat"
        showBack={false}
        rightElement={
          <View className="bg-green-50 rounded-full px-2.5 py-1">
            <Text className="text-[11px] font-medium text-green-800">
              Llama 3.2 1B · offline
            </Text>
          </View>
        }
      />

      {/* Messages */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={{ padding: 20, flexGrow: 1 }}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input bar */}
        <View className="flex-row items-center gap-2.5 px-4 py-3 border-t border-neutral-100">
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            placeholder="Ask something…"
            placeholderTextColor="#9ca3af"
            className="flex-1 bg-neutral-100 rounded-full px-4 py-2.5 text-[13px] text-neutral-900"
          />
          <Pressable
            onPress={handleSend}
            className="w-10 h-10 rounded-full bg-neutral-900 items-center justify-center active:opacity-80"
          >
            <Ionicons name="mic" size={18} color="white" />
          </Pressable>
          <Pressable
            onPress={handleSend}
            className="w-10 h-10 rounded-full bg-neutral-900 items-center justify-center active:opacity-80"
          >
            <Ionicons name="arrow-up" size={18} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}