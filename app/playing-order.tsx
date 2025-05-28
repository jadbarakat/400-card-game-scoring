// initialise player array ✅
// allow user to reorder array according to playing order ✅
// save new array and store it in an atom ✅
// ensure new array has "ordered ids"

import { playersAtom } from "@/atoms/atoms";
import AppText from "@/components/custom/AppText";
import { Player } from "@/types/types";
import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai/react";
import { TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

export default function PlayingOrderScreen() {
  const { colors } = useTheme();
  const [players, setPlayers] = useAtom(playersAtom);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <AppText
        style={{
          fontSize: 30,
          fontWeight: "700",
          paddingBottom: 16,
          color: colors.primary,
        }}
      >
        What is the playing order?
      </AppText>
      <DraggableFlatList<Player>
        data={players}
        autoscrollSpeed={1000}
        scrollEnabled={false}
        keyExtractor={(player) => player.id.toString()}
        renderItem={({
          item,
          drag,
          isActive,
          getIndex,
        }: RenderItemParams<Player>) => {
          const index = (getIndex?.() ?? 0) + 1;

          return (
            <ScaleDecorator>
              <TouchableOpacity
                onLongPress={drag}
                disabled={isActive}
                activeOpacity={0.85}
                style={{
                  borderColor: isActive ? colors.primary : colors.border,
                  backgroundColor: colors.card,
                  borderWidth: 2,
                  borderRadius: 16,
                  marginBottom: 8,
                  height: 48,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  flexDirection: "row",
                }}
              >
                <AppText style={{ color: colors.primary, fontWeight: "800" }}>
                  {index}
                </AppText>
                <AppText>{item.playerName}</AppText>
                <AppText>{item.teamName}</AppText>
                <Ionicons name="reorder-two" size={20} color={colors.text} />
              </TouchableOpacity>
            </ScaleDecorator>
          );
        }}
        // ItemSeparatorComponent={() => (
        //   <View
        //     style={{
        //       height: 1,
        //       width: "100%",
        //       backgroundColor: colors.border,
        //     }}
        //   />
        // )}
        onDragEnd={({ data }) => setPlayers(data)}
      />
    </View>
  );
}
