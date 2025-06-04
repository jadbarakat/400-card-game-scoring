import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";

type CustomColors = NavigationTheme["colors"] & {
  cardHeader: string;
  secondary: string;
};

export interface AppTheme extends Omit<NavigationTheme, "colors"> {
  colors: CustomColors;
}

export const AppLightTheme: AppTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: "#09769A",
    secondary: "#8BBEB2",
    background: "#EBEBEB",
    card: "#FFF",
    cardHeader: "#F5F5F5",
    text: "#1F1F1F",
  },
};

export const AppDarkTheme: AppTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: "#09769A",
    secondary: "#8BBEB2",
    background: "#141414",
    card: "#000",
    cardHeader: "#141414",
    text: "#FCFCFC",
  },
};
