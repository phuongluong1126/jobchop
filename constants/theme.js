import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // primary: "#AE80F5", // Light purple
  // secondary: "#6153D3", // Dark purple
  primary: "#6153D3", // Dark purple
  secondary: "#AE80F5", // Light purple
  background: "#F2F2F4",
  lightPurple: "#C1B4FF",

  white: "#fff",
  black: "#000100",
  green: "#37E39F",
  red: "#F9A8BA",
  blackgray: "#202020",
  gray: "#6A6A6A",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 20,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  header: { fontFamily: "Roboto-Bold", fontSize: 25, lineHeight: 30 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
