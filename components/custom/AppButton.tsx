import { AppDarkTheme } from "@/theme/theme";
import { useTheme } from "@react-navigation/native";
import { PressableProps, TouchableOpacity } from "react-native";
import AppText from "./AppText";

interface AppButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
}

export default function AppButton({ title, onPress }: AppButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        backgroundColor: colors.primary,
        height: 48,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
      onPress={onPress}
    >
      <AppText style={{ color: AppDarkTheme.colors.text, fontWeight: "600" }}>{title}</AppText>
    </TouchableOpacity>
  );
}
