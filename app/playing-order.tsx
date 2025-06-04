import { playersAtom } from "@/atoms/atoms";
import AppButton from "@/components/custom/AppButton";
import AppText from "@/components/custom/AppText";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useAtom } from "jotai/react";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";

export default function PlayingOrderScreen() {
  const { colors } = useTheme();
  const [players, setPlayers] = useAtom(playersAtom);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (players && players.length > 0) {
      setIsReady(true);
    }
  }, [players]);

  const renderItem = useCallback(({ item, drag, isActive, getIndex }: RenderItemParams<any>) => {
    const index = (getIndex?.() ?? 0) + 1;
    return (
      <ScaleDecorator activeScale={1}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPressIn={drag}
          disabled={isActive}
          style={{
            backgroundColor: isActive ? colors.primary + "50" : colors.card,
            marginBottom: 8,
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            borderColor: colors.border,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppText style={{ color: colors.primary, fontWeight: "600" }}>{index}</AppText>
          <AppText style={{ marginLeft: 16 }}>{item.playerName}</AppText>
          <Ionicons name="reorder-two" size={20} color={colors.text} style={{ marginLeft: "auto" }} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }, [colors]);

  const handleDragEnd = useCallback(({ data }: { data: any[] }) => {
    const updatedPlayers = data.map((player) => ({
      ...player,
      id: player.id
    }));
    setPlayers(updatedPlayers);
  }, [setPlayers]);

  if (!players || players.length === 0) {
    return (
      <View style={{ flex: 1, padding: 16, justifyContent: "center", alignItems: "center" }}>
        <AppText>No players available. Please add players first.</AppText>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, padding: 16, justifyContent: "center", alignItems: "center" }}>
        <AppText>Loading...</AppText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
        <AppText
          style={{
            fontSize: 30,
            fontWeight: "700",
            marginBottom: 16,
            color: colors.primary,
          }}
        >
          What is the playing order?
        </AppText>
        <DraggableFlatList
          data={players}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={{ marginBottom: 16 }}
        />
        <AppButton
          title="Start game"
          onPress={() => {
            router.push("/main-game-screen");
          }}
        />
      </View>
    </View>
  );
}
