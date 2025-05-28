import { teamsAtom } from "@/atoms/atoms";
import AppText from "@/components/custom/AppText";
import { AppTheme } from "@/theme/theme";
import { TableContentProps } from "@/types/types";
import { useTheme } from "@react-navigation/native";
import { useAtom } from "jotai/react";
import { useEffect, useMemo, useRef } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function MainGameScreen() {
  const { colors } = useTheme() as AppTheme;
  const scrollViewRef = useRef<ScrollView>(null);
  const [teams] = useAtom(teamsAtom);

  const SECTION_HEIGHT = 32;

  const playerOneInitial = teams[0].players[0].playerName;
  const playerTwoInitial = teams[0].players[1].playerName;
  const playerThreeInitial = teams[1].players[0].playerName;
  const playerFourInitial = teams[1].players[1].playerName;

  const tableHeadings = [
    playerOneInitial,
    playerThreeInitial,
    playerTwoInitial,
    playerFourInitial,
  ];

  const tableData = useMemo(
    () => [
      ["2", "3", "10", "2"],
      ["4", "0", "12", "4"],
      ["6", "4", "14", "6"],
      ["16", "8", "16", "10"],
      ["20", "18", "18", "3"],
      ["22", "16", "20", "-7"],
    ],
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timeout);
  }, [tableData]);

  const TableHeading = () => (
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
      {tableHeadings.map((heading, index) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
          key={index}
        >
          <AppText key={index} style={{ fontWeight: "600", fontSize: 18 }}>
            {heading}
          </AppText>
        </View>
      ))}
    </View>
  );

  const TableContent = ({ data }: TableContentProps) => (
    <View style={{ paddingVertical: 8 }}>
      {data.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            height: SECTION_HEIGHT,
            marginBottom: 8,
            backgroundColor:
              data.length - 1 === rowIndex ? colors.primary : colors.background,
            borderRadius: 8,
          }}
        >
          {row.map((score, colIndex) => (
            <View style={{ flex: 1, alignItems: "center" }} key={colIndex}>
              <AppText
                style={{
                  fontWeight: data.length - 1 === rowIndex ? "800" : "400",
                }}
              >
                {score}
              </AppText>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView>
      <View
        style={{ height: "60%", paddingHorizontal: 8, paddingVertical: 16 }}
      >
        <TableHeading />
        <ScrollView ref={scrollViewRef}>
          <TableContent data={tableData} />
        </ScrollView>
      </View>
      <View
        style={{
          height: "40%",
          paddingHorizontal: 8,
          paddingVertical: 16,
          borderTopWidth: 16,
          borderColor: colors.border,
        }}
      >
        <AppText>Dealer: </AppText>
      </View>
    </SafeAreaView>
  );
}
