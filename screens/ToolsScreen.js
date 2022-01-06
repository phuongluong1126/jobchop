import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { Chart, Heading } from "../components";

import { COLORS, dataMarket, FONTS, icons, SIZES } from "../constants";
const DATA1 = [
  { id: 1, name: "Trắc nghiệm MBJT", image: icons.tool01 },
  { id: 2, name: "Trắc nghiệm MI", image: icons.tool02 },
  { id: 3, name: "Trắc nghiệm IQ", image: icons.tool03 },
];
const DATA2 = [
  { id: 1, name: "Tạo CV", image: icons.tool02 },
  { id: 2, name: "Tạo Cover Letter", image: icons.tool01 },
  { id: 3, name: "Tính lương", image: icons.tool02 },
];
export default function ToolsScreen() {
  const chartFilter = useSelector((state) => state.job.chartFilter);
  const location = chartFilter.location;
  const cate = chartFilter.cate;
  const exper = chartFilter.exper;
  // console.log('user',user);
  const GPA = dataMarket[location][cate][exper]["Lương trung bình"] || "nodata";
  console.log("GPA", GPA);
  const navigation = useNavigation();
  const renderTool = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginRight: 18,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={item.image}
          style={{
            width: 60,
            height: 80,
            // marginTop: 5,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            ...FONTS.body4,
            width: 115,
            textAlign: "center",
            marginTop: -5,
          }}
        >
          {item.name}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        // paddingTop: Platform.OS === "android" ? 20 : 0,
        paddingTop: 15,
      }}
    >
      <ScrollView style={{ backgroundColor: COLORS.background }}>
        <View style={{ marginTop: 20, marginHorizontal: 20, flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h2,
              fontSize: 22,
            }}
          >
            Khảo sát thị trường
          </Text>
                  <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
              marginTop: 5,
            alignItems:"center" 
          }}
        >
          <Icon name="place" size={21} color={COLORS.secondary} />
          <Text
            style={{
              color: COLORS.blackgray,
              ...FONTS.h2,
              // marginTop: 10,
              marginLeft: 5,
            }}
          >
            {location}
          </Text>
        </View>

        </View>

        <View
          style={{
            flexDirection: "row",
            // paddingHorizontal: 15,
            paddingLeft: 10,
            marginTop: 5,
            justifyContent: "space-between",
            alignItems:"flex-end"
          }}
        >
          <View>
          <Text
            style={{
              ...FONTS.h2,
              // alignSelf: "center",
              paddingHorizontal: 10,
              color: COLORS.blackgray,
              fontSize: 19,
            }}
          >
            Trung bình: {GPA}
          </Text>
                    <Text
            style={{
              color: COLORS.gray,
              ...FONTS.body4,
              // marginTop: -15,
              marginLeft: 10,
            }}
          >
            (Số việc - Lương)
          </Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: 25 }}
            onPress={() => {
              navigation.navigate("FilterMarket");
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body3,
                backgroundColor: COLORS.secondary,
                padding: 5,
                paddingHorizontal: 7,
                borderRadius: 22,
                width: 89,
                // alignSelf:"flex-end",
                // marginRight:20
              }}
            >
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{marginTop:15, marginBottom:5}}>
            <Chart location={location} cate={cate} exper={exper} />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            // paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
            marginTop: -10,
          }}
        >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color: COLORS.blackgray,
                  ...FONTS.h3,
                fontSize:17,
                // marginTop: 5,
                marginLeft: 20,
              }}
            >
              {cate} - {exper}
            </Text>
          </View>
        </View>
          {/* <Icon name="mood" size={25} color={COLORS.secondary} /> */}
        </View>
        {/* Tiện ích khác */}
        <View>
          <Text
            style={{
              color: COLORS.primary,
              ...FONTS.h2,
              fontSize: 22,
              paddingHorizontal: 20,
              marginTop: 30,
            }}
          >
            Công cụ hữu ích
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: 5 }}
            data={DATA2}
            renderItem={renderTool}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            marginLeft={20}
            width={"100%"}
          ></FlatList>
          {/* <FlatList
            contentContainerStyle={{ marginTop: -5 }}
            data={DATA1}
            renderItem={renderTool}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            marginLeft={20}
            width={"100%"}
          ></FlatList> */}
        </View>
        {/* Khảo sát thị trường */}
      </ScrollView>
    </SafeAreaView>
  );
}
