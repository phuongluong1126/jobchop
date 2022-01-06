import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { HeaderBar } from "../components";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "../components";
import { COLORS, FONTS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ChartFilter } from "../actions/job";
DropDownPicker.setMode("BADGE");

const LocationList = [
  { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  // { label: "Khác", value: "Khác" },
];
const CateList = [
  { label: "Lập trình ứng dụng di động", value: "Lập trình ứng dụng di động" },
  { label: "Lập trình viên FullStack", value: "Lập trình viên FullStack" },
  { label: "Lập trình viên Back-End", value: "Lập trình viên Back-End" },
  { label: "Lập trình viên Front-End", value: "Lập trình viên Front-End" },
  {
    label: "Chuyên viên vận hành hệ thống",
    value: "Chuyên viên vận hành hệ thống",
  },
  { label: "Kiểm thử phần mềm", value: "Kiểm thử phần mềm" },
];

const ExperList = [
  { label: "Intern", value: "Intern" },
  { label: "Fresher", value: "Fresher" },
  { label: "Junior", value: "Junior" },
  { label: "Senior & Upper", value: "Senior & Upper" },
];

export default function FilterMarket() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const chartFilter = useSelector(state => state.job.chartFilter);
  const [location, setLocation] = useState(chartFilter.location);
  const [exper, setExper] = useState(chartFilter.exper);
  const [cate, setCate] = useState(chartFilter.cate);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
    >
      <HeaderBar />
      <Text
        style={{
          color: COLORS.primary,
          alignSelf: "center",
          ...FONTS.h2,
          fontSize: 24,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        Khảo sát thị trường
      </Text>
      {/* <Picker
        name="Chuyên ngành"
        listItem={CateList}
        zIndex={5000}
        sendValue={setCate}
        placeholder="Chọn chuyên ngành bạn muốn làm việc"
      /> */}
      <Picker
        name="Chuyên ngành"
        listItem={CateList}
        zIndex={4000}
        sendValue={setCate}
        placeholder="Chọn chuyên ngành"
        defaultValue={cate}
        // multi={true}
        // searchable={true}
      />
      <Picker
        name="Kinh nghiệm"
        listItem={ExperList}
        zIndex={3000}
        sendValue={setExper}
        placeholder="Chọn kinh nghiệm"
        defaultValue={exper}
      />
      <Picker
        name="Khu vực"
        listItem={LocationList}
        zIndex={2000}
        sendValue={setLocation}
        placeholder="Chọn khu vực"
        defaultValue={location}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Hủy bỏ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(ChartFilter({ location: location, cate: cate, exper: exper }));
            navigation.navigate('Tools')
          }}
        >
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Tìm kiếm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 20,
    marginTop: 10,
    marginBottom: 65,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    width: 110,
  },
});
