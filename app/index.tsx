import AppButton from "@/components/custom/AppButton";
import AppText from "@/components/custom/AppText";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { View } from "react-native";

export default function App() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}
    >
      <AppText
        style={{
          fontSize: 30,
          fontWeight: "700",
          color: colors.primary,
          paddingBottom: 16,
        }}
      >
        Welcome to 400 scoring.
      </AppText>
      <AppText style={{ paddingBottom: 48 }}>
        Your one-stop-shop to scoring your own 400 card game.
      </AppText>
      <AppButton title="Start game" onPress={() => router.push("/team-one-entry")} />
    </View>
  );
}
