import { useTheme } from "@react-navigation/native";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export default function AppText({ children, style, ...rest }: AppTextProps) {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text, fontSize: 16 }, style]} {...rest}>
      {children}
    </Text>
  );
}
