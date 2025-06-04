import { useTheme } from "@react-navigation/native";
import { PressableProps, TouchableOpacity } from "react-native";
import AppText from "./AppText";

interface AppButtonProps extends PressableProps {
    title: string;
    onPress: () => void;
    hasBorder?: boolean;
}

export default function AppSecondaryButton({ title, onPress, hasBorder }: AppButtonProps) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={{
                height: 48,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                borderColor: colors.primary,
                borderWidth: hasBorder ? 2 : 0
            }}
            onPress={onPress}
        >
            <AppText style={{ fontWeight: "600", color: colors.primary }}>{title}</AppText>
        </TouchableOpacity>
    );
}
