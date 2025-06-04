import { useTheme } from "@react-navigation/native";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export default function AppTitle({ children, style }: AppTextProps) {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text, fontSize: 30 }, style]}>{children}</Text>;
}
