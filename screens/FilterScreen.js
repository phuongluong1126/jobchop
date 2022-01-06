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
import { SetSearchFilter } from "../actions/job";
DropDownPicker.setMode("BADGE");

const LocationList = [
  { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Khác", value: "Khác" },
];

const CountryList = [
  { label: "Viet Nam", value: "Vietnam" },
  { label: "Japan", value: "Japan" },
  { label: "United States", value: "United States" },
  { label: "Tất cả", value: "Other" },
];
const TypeList = [
  { label: "Product", value: "Product" },
  { label: "Outsourcing", value: "Outsourcing" },
  { label: "Tất cả", value: null },
];

const ExperList = [
  { label: "Chưa có kinh nghiệm", value: "Intern" },
  { label: "Fresher", value: "Fresher" },
  { label: "Junior", value: "Junior" },
  { label: "Senior & Upper", value: "Senior & Upper" },
];
const skills = [
  "typescript",
  "english",
  "golang",
  "python",
  "c#",
  "c++",
  "dart",
  "kotlin",
  "java",
  "javascript",
  "html",
  "css",
  "php",
  "swift",
  "ruby",
  "Objective-C",
  "iis",
  "tomcat",
  "weblogic",
  "ibm",
  "ui-ux",
  "responsive",
  "mvvm",
  "rest",
  "restapi",
  "soap",
  "webservice",
  "postman",
  "web api",
  "webapi",
  "bootstrap",
  "jquery",
  "ajax",
  "j-query",
  "wcf",
  "asp",
  ".net",
  ".net core",
  "mvc",
  "entity framework",
  "numby",
  "pandas",
  "ml",
  "ai",
  "scikit-learn",
  "django",
  "flask",
  "pytorch",
  "keras",
  "tensorflows",
  "jenkins",
  "circleci",
  "ci/cd",
  "spring",
  "j2ee",
  "xpath",
  "erp",
  "laravel",
  "ruby on rails",
  "express",
  "angular",
  "vue",
  "react",
  "node",
  "game",
  "designer",
  "oop",
  "algorithm",
  "architectural patterns",
  "system design",
  "data structure",
  "flutter",
  "hybrid",
  "xcode",
  "ios",
  "testflight",
  "avfoundation",
  "xml",
  "json",
  "xamarin",
  "unity",
  "apache",
  "cloud",
  "devop",
  "linux",
  "virual",
  "microservice",
  "docker",
  "kubernetes",
  "azure",
  "git",
  "hadoop",
  "flink",
  "spark",
  "test",
  "qa",
  "qc",
  "unit test",
  "integration test",
  "automation test",
  "selenium",
  "desgin pattern",
  "blockchain",
  "aws",
  "system",
  "cassandra",
  "sql server",
  "mysql",
  "oracle",
  "mongodb",
  "firebase",
  "sqlserver",
  "postgresql",
  "db2",
  "redis",
  "sqlite",
  "access",
  "elasticsearch",
  "nosql",
  "webdriver",
  "cucumber",
  "agile",
  "scrum",
  "bitbucket",
  "maven",
  "gradle",
  "trello",
  "ssl",
  "tls",
  "winform",
  "3d design",
  "swagger",
];
const SkillList = skills.map((item) => ({ label: item, value: item }));
export default function FilterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.job.searchFilter);
  console.log("searchFilter", searchFilter);
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);
  const [skill, setSkill] = useState(null);
  const [exper, setExper] = useState(null);
  const [type, setType] = useState(
    (searchFilter && searchFilter.type)? searchFilter.type : null
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === "android" ? 10 : 0,
      }}
    >
      <HeaderBar />
      <Text
        style={{
          color: COLORS.primary,
          alignSelf: "center",
          ...FONTS.h2,
          fontSize: 24,
          marginTop: -10,
          marginBottom: 10,
        }}
      >
        Tìm kiếm nâng cao
      </Text>
      <Picker
        name="Loại công ty"
        listItem={TypeList}
        zIndex={5000}
        sendValue={setType}
        placeholder="Chọn loại công ty"
        defaultValue={type}
      />
      {/* <Picker
        name="Kỹ năng"
        listItem={SkillList}
        zIndex={4000}
        sendValue={setSkill}
        placeholder="Chọn những kỹ năng mà bạn có"
        multi={true}
        searchable={true}
      /> */}
      <Picker
        name="Quốc gia"
        listItem={CountryList}
        zIndex={4000}
        sendValue={setCountry}
        placeholder="Chọn Quốc gia của công ty"
      />
      <Picker
        name="Khu vực"
        listItem={LocationList}
        zIndex={3000}
        sendValue={setLocation}
        placeholder="Chọn khu vực của bạn"
      />
      <Picker
        name="Kinh nghiệm"
        listItem={ExperList}
        zIndex={2000}
        sendValue={setExper}
        placeholder="Chọn mức kinh nghiệm của bạn"
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
            dispatch(
              SetSearchFilter({
                location: location,
                type: type,
                country: country,
              })
            );
            navigation.goBack();
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
