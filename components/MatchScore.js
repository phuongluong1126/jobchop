import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { COLORS, FONTS } from "../constants";

export default function MatchScore({ score }) {
  const [value, setValue] = useState(0);
  console.log('SCORE',score);

  return (
    <View style={styles.container}>
      <Text style={{ ...FONTS.h3, padding: 5 }}>MATCH SCORE</Text>

      <CircularProgress
        radius={70}
        value={score?score:0}
        textColor={COLORS.primary}
        fontSize={20}
        valueSuffix={"%"}
        inActiveStrokeColor={COLORS.gray}
        activeStrokeColor={COLORS.primary}
        inActiveStrokeOpacity={0.2}
        inActiveStrokeWidth={8}
        // duration={2000}
        // onAnimationComplete={() => setValue(85)}
      />
      {score?<Text style={{ ...FONTS.h3, padding: 5 }}>
        Bạn đạt {score} % yêu cầu công việc
      </Text>:<Text style={{ ...FONTS.h3, padding: 5 }}>
        Không có dữ liệu math score
      </Text>}
      {/* <CircularProgress
        radius={100}
        value={value}
        textColor="#222"
        fontSize={20}
        valueSuffix={"%"}
        activeStrokeColor={"tomato"}
        inActiveStrokeOpacity={0.2}
        duration={4000}
      /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
