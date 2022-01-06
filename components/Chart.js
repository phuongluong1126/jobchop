import * as React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryBar,
} from "victory-native";
import { COLORS, SIZES } from "../constants";
import { chartData } from "../constants/dummy";
import { VictoryCustomTheme } from "../styles";

export default function Chart({ location, cate, exper }) {
  function renderChart() {
    return (
      <View
        style={{
          alignItems: "center",
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
          paddingHorizontal: 10,
          ...styles.shadow,
        }}
      >
        <VictoryChart
          domainPadding={{ x: 30 }}
          animate={{ duration: 500 }}
          theme={VictoryCustomTheme}
          height={200}
          width={SIZES.width - 60}
          padding={{ top: 20, bottom: 40, left: 40 }}
          y0={(d) => d.y - 1}
        >
          <VictoryBar
            // data={chartData({location:"Hà Nội", cate:"Lập trình viên FullStack", exper:"Senior & Upper"})}
            data={chartData({location, cate, exper})}
            style={{
              data: { fill: COLORS.secondary, width: 14 },
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                  fill: "orange",
                  label: "BYE",
                }),
              },
            }}
            // categories={{
            //   x: [
            //     "5-7.5 mil",
            //     "7.5-10 mil",
            //     "10-12.5 mil",
            //     "12.5-15 mil",
            //     "15-17.5 mil",
            //     // "17.5-20 mil",
            //   ],
            //   y: [
            //     10,
            //     10,
            //     5,
            //     5,
            //     5,
            //     // "5",
            //   ],
            // }}
          />
        </VictoryChart>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, paddingBottom: SIZES.padding }}>
      {renderChart()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
