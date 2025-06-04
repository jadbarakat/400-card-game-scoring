import { currentCutterAtom, currentDealerAtom, currentRoundAtom, playersAtom, roundsAtom, totalScoresAtom } from "@/atoms/atoms";
import AppButton from "@/components/custom/AppButton";
import AppSecondaryButton from "@/components/custom/AppSecondaryButton";
import { AppSheetInput } from "@/components/custom/AppSheetInput";
import AppText from "@/components/custom/AppText";
import { AppTheme } from "@/theme/theme";
import { Player, Rounds } from "@/types/types";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { DarkTheme, useTheme } from "@react-navigation/native";
import { useAtom } from "jotai/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, SafeAreaView, ScrollView, View } from "react-native";


export default function MainGameScreen() {
  const { colors } = useTheme() as AppTheme;
  const scrollViewRef = useRef<ScrollView>(null);
  const [players] = useAtom(playersAtom);

  const [playerOneBid, setPlayerOneBid] = useState<number>(0);
  const [playerTwoBid, setPlayerTwoBid] = useState<number>(0);
  const [playerThreeBid, setPlayerThreeBid] = useState<number>(0);
  const [playerFourBid, setPlayerFourBid] = useState<number>(0);

  const [totalScores] = useAtom(totalScoresAtom);

  const [currentRound, setCurrentRound] = useAtom(currentRoundAtom);
  const [rounds, setRounds] = useAtom(roundsAtom);

  const [currentDealer, setCurrentDealer] = useAtom(currentDealerAtom);
  const [currentCutter, setCurrentCutter] = useAtom(currentCutterAtom);

  const [isRoundInProgress, setIsRoundInProgress] = useState<boolean>(false);

  const snapPoints = useMemo(() => ["80%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    setCurrentDealer(players[randomIndex]);
    setCurrentCutter(randomIndex === 0 ? players[players.length - 1] : players[randomIndex - 1]);
  }, [players]);

  const randomIndex = Math.floor(Math.random() * players.length);

  const SECTION_HEIGHT = 32;

  const DealerLabel = () => (
    <View
      style={{
        height: 20,
        width: 20,
        margin: 4,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppText style={{ fontSize: 12, fontWeight: "700", color: DarkTheme.colors.text }}>D</AppText>
    </View>
  );

  const CutterLabel = () => (
    <View
      style={{
        height: 20,
        width: 20,
        margin: 4,
        borderRadius: 20,
        backgroundColor: colors.cardHeader,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppText style={{ fontSize: 12, fontWeight: "500" }}>C</AppText>
    </View>
  );

  const recordRoundBids = () => {
    setCurrentRound({
      id: rounds.length,
      bids: [
        { playerId: 0, amount: playerOneBid ?? 0 },
        { playerId: 1, amount: playerTwoBid ?? 0 },
        { playerId: 2, amount: playerThreeBid ?? 0 },
        { playerId: 3, amount: playerFourBid ?? 0 },
      ],
    });
  }

  const RoundInProgressCard = () => (
    <View style={{
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
    }}>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: 8,
          paddingVertical: 16,
        }}
      >
        <AppText>Round in progress</AppText>
        <ActivityIndicator size="small" color={colors.text} />
      </View>
      <View style={{
        width: "80%",
      }}>
        <AppSecondaryButton title="End round" onPress={() => {
          setIsRoundInProgress(false)
        }} />
      </View>
    </View>
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timeout);
  }, [rounds]);

  const TableHeading = ({ players }: { players: Player[] }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: SECTION_HEIGHT,
        backgroundColor: colors.card,
        borderRadius: 8,
      }}
    >
      {players.map((player, index) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          key={index}
        >
          <AppText style={{ fontWeight: "600", fontSize: 18 }}>
            {player.playerName}
          </AppText>
          {currentDealer?.playerName === player.playerName && <DealerLabel />}
          {currentCutter?.playerName === player.playerName && <CutterLabel />}
        </View>
      ))}
    </View>
  );

  const TableContent = ({ data }: { data: Rounds[] }) => {
    const rawScores = data.map(round =>
      round.scores.map(score => score.score)
    );

    return (
      <View style={{ paddingVertical: 8 }}>
        {data.map((round, roundIndex) => (
          <View
            key={roundIndex}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              height: SECTION_HEIGHT,
              marginBottom: 8,
              backgroundColor: data.length - 1 === roundIndex ? colors.primary : colors.background,
              borderRadius: 8,
            }}
          >
            {round.scores.map((score, colIndex) => (
              <View style={{ flex: 1, alignItems: "center" }} key={colIndex}>
                <AppText
                  style={{
                    fontWeight: data.length - 1 === roundIndex ? "800" : "400",
                    color: data.length - 1 === roundIndex ? DarkTheme.colors.text : colors.text,
                  }}
                >
                  {score.score}
                </AppText>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
    ),
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flex: 1 }}>
          <TableHeading players={players} />
          <ScrollView ref={scrollViewRef}>
            <TableContent data={rounds} />
          </ScrollView>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 40,
            left: 16,
            right: 16,
          }}
        >
          {isRoundInProgress && <RoundInProgressCard />}
          <AppButton
            title="Start next round"
            onPress={() => bottomSheetRef.current?.snapToIndex(0)}
          />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.text }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={{
            backgroundColor: colors.background,
            flex: 1,
            padding: 16,
            paddingVertical: 32,
          }}
        >
          <View style={{ flex: 1 }}>
            <AppSheetInput
              label={`${players[0].playerName}'s bid`}
              value={playerOneBid?.toString() ?? ""}
              placeholder="Enter player bid"
              setValue={(value) => setPlayerOneBid(Number(value))}
            />
            <AppSheetInput
              label={`${players[1].playerName}'s bid`}
              value={playerTwoBid?.toString() ?? ""}
              placeholder="Enter player bid"
              setValue={(value) => setPlayerTwoBid(Number(value))}
            />
            <AppSheetInput
              label={`${players[2].playerName}'s bid`}
              value={playerThreeBid?.toString() ?? ""}
              placeholder="Enter player bid"
              setValue={(value) => setPlayerThreeBid(Number(value))}
            />
            <AppSheetInput
              label={`${players[3].playerName}'s bid`}
              value={playerFourBid?.toString() ?? ""}
              placeholder="Enter player bid"
              setValue={(value) => setPlayerFourBid(Number(value))}
            />
          </View>
          <View style={{ marginTop: "auto", marginBottom: 24 }}>
            <AppButton
              title="Start round"
              onPress={() => {
                recordRoundBids();
                setIsRoundInProgress(true);
                bottomSheetRef.current?.close();
                Keyboard.dismiss();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
