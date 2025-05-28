import { useTheme } from "@react-navigation/native";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "./AppText";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface AppInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
}

export const AppInput = ({
  label,
  placeholder,
  value,
  setValue,
}: AppInputProps) => {
  const { colors } = useTheme();

  const [focused, setFocused] = useState(false);

  const ClearIcon = () => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.background,
        height: 24,
        width: 24,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
      activeOpacity={0.85}
      onPress={() => setValue("")}
    >
      <Ionicons name="close" size={16} color={colors.text} />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <AppText
        style={{
          paddingBottom: 8,
          fontWeight: "600",
        }}
      >
        {label}
      </AppText>
      <View
        style={{
          backgroundColor: colors.card,
          height: 48,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: focused ? colors.primary : colors.border,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={{
            color: colors.text,
            fontSize: 16,
            flex: 1,
            height: "100%",
          }}
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          onChangeText={setValue}
          onFocus={() => setFocused(true)}
          onEndEditing={() => setFocused(false)}
        />
        {value && <ClearIcon />}
      </View>
    </View>
  );
};
