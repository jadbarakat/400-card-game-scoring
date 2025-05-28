import { teamsAtom } from "@/atoms/atoms";
import AppText from "@/components/custom/AppText";
import { AppTheme } from "@/theme/theme";
import { Team } from "@/types/types";
import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai/react";
import { KeyboardAvoidingView, View } from "react-native";

export default function RulesSetupScreen() {
  const { colors } = useTheme() as AppTheme;

  const [teams] = useAtom(teamsAtom);

  const TeamCard = ({ team }: { team: Team }) => (
    <View
      style={{
        backgroundColor: colors.card,
        marginBottom: 16,
        borderRadius: 16,
        borderColor: colors.border,
      }}
    >
      <View
        style={{
          backgroundColor: colors.cardHeader,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppText style={{ fontWeight: "700", fontSize: 18 }}>
          {team.teamName}
        </AppText>
      </View>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {team.players.map((player) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              backgroundColor: colors.cardHeader,
              marginHorizontal: 8,
              borderRadius: 16,
            }}
            key={player.id}
          >
            <AppText style={{ fontWeight: "500" }}>{player.playerName}</AppText>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}
      behavior="padding"
    >
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </KeyboardAvoidingView>
  );
}
