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

  const [teamOneName, setTeamOneName] = useState("Champs");
  const [playerOneName, setPlayerOneName] = useState("Jad");
  const [playerTwoName, setPlayerTwoName] = useState("Pat");

  const inputs = [
    {
      label: "Team name",
      placeholder: "Team 1 name",
      value: teamOneName,
      setValue: setTeamOneName,
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

  const submitTeamOnePlayers = () => {
    const playerOne: Player = {
      id: 0,
      playerName: playerOneName,
      teamName: teamOneName,
    };
    const playerTwo: Player = {
      id: 1,
      playerName: playerTwoName,
      teamName: teamOneName,
    };

    setPlayers([playerOne, playerTwo]);

    const teamOne = {
      id: 0,
      teamName: teamOneName,
      players: [
        { id: 0, playerName: playerOneName, teamName: teamOneName },
        { id: 1, playerName: playerTwoName, teamName: teamOneName },
      ],
    };

    setTeams([teamOne]);

    Keyboard.dismiss();
    router.push("/team-two-entry");
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
        Enter team one details
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
      <AppButton title="Enter team two details" onPress={submitTeamOnePlayers} />
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
}
