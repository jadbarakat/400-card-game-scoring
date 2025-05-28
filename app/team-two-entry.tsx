import { playersAtom, teamsAtom } from "@/atoms/atoms";
import AppButton from "@/components/custom/AppButton";
import { AppInput } from "@/components/custom/AppInput";
import AppText from "@/components/custom/AppText";
import { Player } from "@/types/types";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useSetAtom } from "jotai/react";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, View } from "react-native";

export default function PlayersInputScreen() {
  const { colors } = useTheme();

  const setPlayers = useSetAtom(playersAtom);
  const setTeams = useSetAtom(teamsAtom);

  const [teamTwoName, setTeamTwoName] = useState("Losers");
  const [playerOneName, setPlayerOneName] = useState("Tex");
  const [playerTwoName, setPlayerTwoName] = useState("Jase");

  const inputs = [
    {
      label: "Team name",
      placeholder: "Team 2 name",
      value: teamTwoName,
      setValue: setTeamTwoName,
    },
    {
      label: "Player 1 name",
      placeholder: "Player 1 name",
      value: playerOneName,
      setValue: setPlayerOneName,
    },
    {
      label: "Player 2 name",
      placeholder: "Player 2 name",
      value: playerTwoName,
      setValue: setPlayerTwoName,
    },
  ];

  const submitTeamTwoPlayers = () => {
    const playerOne: Player = {
      id: 2,
      playerName: playerOneName,
      teamName: teamTwoName,
    };
    const playerTwo: Player = {
      id: 3,
      playerName: playerTwoName,
      teamName: teamTwoName,
    };

    setPlayers((prev) => {
      if (!Array.isArray(prev)) return prev;

      return [...prev, playerOne, playerTwo];
    });

    Keyboard.dismiss();
    router.push("/playing-order");
    // router.push("/main-game-screen");
  };

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 16,
      }}
      behavior="padding"
    >
      <AppText
        style={{
          fontSize: 30,
          fontWeight: "700",
          paddingBottom: 16,
          color: colors.primary,
        }}
      >
        Enter team two details
      </AppText>
      <View
        style={{
          paddingTop: 8,
          paddingBottom: 24,
        }}
      >
        {inputs.map((field, index) => (
          <AppInput
            key={index}
            label={field.label}
            placeholder={field.placeholder}
            value={field.value}
            setValue={field.setValue}
          />
        ))}
      </View>
      <AppButton title="Submit players" onPress={submitTeamTwoPlayers} />
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
}
