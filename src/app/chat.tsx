import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  LlamaMessage,
  loadModel,
  sendMessage,
} from "../ai/llamaClient";
import AppHeader from "../components/AppHeader";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

const initialMessages: Message[] = [];

// Copies the picked .gguf file into the app's sandboxed storage.
// This avoids Android scoped-storage restrictions that block native
// fopen()/mmap() calls on raw /sdcard paths.
async function pickAndCopyModel(): Promise<string> {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*", // .gguf has no standard MIME type
    copyToCacheDirectory: false,
  });

  if (result.canceled || !result.assets?.length) {
    throw new Error("No model file selected.");
  }

  const sourceUri = result.assets[0].uri;
  const destUri = `${FileSystem.documentDirectory}model.gguf`;

  const existing = await FileSystem.getInfoAsync(destUri);
  if (!existing.exists) {
    await FileSystem.copyAsync({ from: sourceUri, to: destUri });
  }

  // llama.rn expects a plain filesystem path, not a file:// URI
  return destUri.replace("file://", "");
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <View
      className={`mb-3 max-w-[80%] rounded-2xl px-4 py-2.5 ${isUser ? "self-end bg-neutral-900" : "self-start bg-neutral-100"
        }`}
    >
      <Text
        className={`text-[13px] leading-5 ${isUser ? "text-white" : "text-neutral-900"
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
  const [modelPath, setModelPath] = useState<string | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (!modelPath) {
      return;
    }

    let isMounted = true;

    async function initializeModel() {
      try {
        setIsLoadingModel(true);
        setError(null);
        setModelReady(false);

        await loadModel(modelPath as string);

        if (isMounted) {
          setModelReady(true);
        }
      } catch (loadError) {
        console.error(loadError);
        if (isMounted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load the model.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingModel(false);
        }
      }
    }

    void initializeModel();

    return () => {
      isMounted = false;
    };
  }, [modelPath]);

  async function handlePickModel() {
    try {
      setError(null);
      const path = await pickAndCopyModel();
      setModelPath(path);
    } catch (pickError) {
      setError(
        pickError instanceof Error
          ? pickError.message
          : "Unable to select the model file.",
      );
    }
  }

  async function handleSend() {
    const text = input.trim();

    if (!text || !modelReady || isSending) {
      return;
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      text,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsSending(true);

    try {
      const conversation: LlamaMessage[] = nextMessages.map((message) => ({
        role: message.role,
        content: message.text,
      }));

      const responseText = await sendMessage(conversation);

      const assistantMessage: Message = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        text: responseText || "I could not generate a response.",
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        assistantMessage,
      ]);
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Unable to generate a response.",
      );
    } finally {
      setIsSending(false);
    }
  }

  const canSend = input.trim().length > 0 && modelReady && !isSending;

  const statusLabel = isLoadingModel
    ? "Loading model…"
    : modelReady
      ? "Llama 3.2 1B · offline"
      : "No model selected";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        title="AI Chat"
        showBack={false}
        rightElement={
          <Pressable
            onPress={() => void handlePickModel()}
            disabled={isLoadingModel}
            className={`rounded-full px-2.5 py-1 ${modelReady ? "bg-green-50" : "bg-neutral-100"
              }`}
          >
            <Text
              className={`text-[11px] font-medium ${modelReady ? "text-green-800" : "text-neutral-600"
                }`}
            >
              {statusLabel}
            </Text>
          </Pressable>
        }
      />

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

        {!modelReady && !isLoadingModel ? (
          <View className="items-center px-4 pb-2">
            <Pressable
              onPress={() => void handlePickModel()}
              className="rounded-full bg-neutral-900 px-4 py-2"
            >
              <Text className="text-[13px] font-medium text-white">
                Select model (.gguf)
              </Text>
            </Pressable>
          </View>
        ) : null}

        {error ? (
          <Text className="px-4 pb-2 text-xs text-red-600">{error}</Text>
        ) : null}

        {isSending ? (
          <View className="flex-row items-center px-4 pb-2">
            <ActivityIndicator size="small" />
            <Text className="ml-2 text-xs text-neutral-500">
              Generating response…
            </Text>
          </View>
        ) : null}

        <View className="flex-row items-center gap-2.5 border-t border-neutral-100 px-4 py-3">
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => void handleSend()}
            editable={modelReady && !isSending}
            placeholder="Ask something…"
            placeholderTextColor="#9ca3af"
            returnKeyType="send"
            className="flex-1 rounded-full bg-neutral-100 px-4 py-2.5 text-[13px] text-neutral-900"
          />

          {/* Connect this to audio recording when voice input is implemented. */}
          <Pressable
            disabled
            className="h-10 w-10 items-center justify-center rounded-full bg-neutral-300"
          >
            <Ionicons name="mic" size={18} color="white" />
          </Pressable>

          <Pressable
            onPress={() => void handleSend()}
            disabled={!canSend}
            className={`h-10 w-10 items-center justify-center rounded-full ${canSend ? "bg-neutral-900" : "bg-neutral-300"
              }`}
          >
            <Ionicons name="arrow-up" size={18} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}