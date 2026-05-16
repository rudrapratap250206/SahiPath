import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import { useMentorChat } from "@workspace/api-client-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

function MessageBubble({ msg, colors }: { msg: Message; colors: ReturnType<typeof useColors> }) {
  const isUser = msg.role === "user";
  return (
    <View style={{
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "82%",
      marginVertical: 4,
      marginHorizontal: 14,
    }}>
      {!isUser && (
        <View style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.primary + "22",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        }}>
          <Feather name="compass" size={12} color={colors.primary} />
        </View>
      )}
      <View style={{
        backgroundColor: isUser ? colors.primary : colors.card,
        borderRadius: 16,
        borderBottomRightRadius: isUser ? 4 : 16,
        borderBottomLeftRadius: isUser ? 16 : 4,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: isUser ? 0 : 1,
        borderColor: colors.border,
      }}>
        <Text style={{
          fontSize: 15,
          lineHeight: 22,
          color: isUser ? colors.primaryForeground : colors.foreground,
          fontFamily: "Inter_400Regular",
        }}>
          {msg.text}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { profile } = useAuth();
  const mentorMutation = useMentorChat();

  const [messages, setMessages] = useState<Message[]>(() => {
    const name = profile?.firstName || "there";
    return [{
      id: "welcome",
      role: "assistant",
      text: `Hi ${name}! I'm your SahiPath AI career mentor. Ask me anything about your career path, skills to develop, or job opportunities. I'm here to guide you!`,
    }];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const userMsg: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      role: "user",
      text,
    };
    setMessages((prev) => [userMsg, ...prev]);
    setIsTyping(true);

    try {
      const data = await mentorMutation.mutateAsync({
        data: {
          message: text,
          profile: profile as any,
          mode: "text",
        },
      });
      const rawReply = (data as any).reply || "No reply returned.";
      const displayReply = rawReply.replace(/🔔\s*STUDY_TOPIC:[^\n]*/gi, "").trim();
      const assistantMsg: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        role: "assistant",
        text: displayReply,
      };
      setMessages((prev) => [assistantMsg, ...prev]);
    } catch (err: any) {
      const fallback = err?.data?.error || err?.message || "Unable to reach the mentor. Check your GEMINI_API_KEY.";
      const errorMsg: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        role: "assistant",
        text: fallback,
      };
      setMessages((prev) => [errorMsg, ...prev]);
    } finally {
      setIsTyping(false);
    }
  };

  const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: topPad + 8,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
      gap: 10,
    },
    headerIcon: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.primary + "22",
      alignItems: "center",
      justifyContent: "center",
    },
    headerTitle: { fontSize: 17, fontFamily: "Inter_700Bold", color: colors.foreground },
    headerSub: { fontSize: 12, color: colors.primary, fontFamily: "Inter_400Regular" },
    typingWrap: {
      alignSelf: "flex-start",
      marginHorizontal: 14,
      marginVertical: 4,
      backgroundColor: colors.card,
      borderRadius: 16,
      borderBottomLeftRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
      paddingHorizontal: 14,
      paddingTop: 10,
      paddingBottom: bottomPad + 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.background,
    },
    textInput: {
      flex: 1,
      backgroundColor: colors.input,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.foreground,
      fontFamily: "Inter_400Regular",
      maxHeight: 100,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sendBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyMsg: {
      textAlign: "center",
      color: colors.mutedForeground,
      fontSize: 13,
      fontFamily: "Inter_400Regular",
      marginTop: 20,
      paddingHorizontal: 40,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={s.container}
      keyboardVerticalOffset={0}
    >
      <View style={s.header}>
        <View style={s.headerIcon}>
          <Feather name="compass" size={18} color={colors.primary} />
        </View>
        <View>
          <Text style={s.headerTitle}>AI Mentor</Text>
          <Text style={s.headerSub}>SahiPath Career Guide</Text>
        </View>
      </View>

      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble msg={item} colors={colors} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={!!messages.length}
        ListHeaderComponent={
          isTyping ? (
            <View style={s.typingWrap}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={{ color: colors.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular" }}>
                Thinking...
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          messages.length === 0 ? (
            <Text style={s.emptyMsg}>Ask your AI mentor anything to get started!</Text>
          ) : null
        }
      />

      <View style={s.inputRow}>
        <TextInput
          style={s.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Ask your mentor..."
          placeholderTextColor={colors.mutedForeground}
          multiline
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={sendMessage}
        />
        <Pressable
          style={[s.sendBtn, (!input.trim() || isTyping) && { opacity: 0.4 }]}
          onPress={sendMessage}
          disabled={!input.trim() || isTyping}
        >
          <Feather name="send" size={16} color={colors.primaryForeground} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
