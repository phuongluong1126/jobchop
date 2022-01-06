import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "../components";
import {
  ChartFilter,
  SetCompanies,
  SetInfoProfile,
  SetJobs,
} from "../actions/job";
import { getAllCompanies, getAllJobs } from "../api";

const LocationList = [
  { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Khác", value: "Khác" },
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

export default function UpdateProfile() {
  const info = useSelector((state) => state.job.infoUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.job.infoUser);
  const [location, setLocation] = useState(user.location);
  const [skill, setSkill] = useState(user.skill);
  const [exper, setExper] = useState(user.exper);
  const [cate, setCate] = useState(user.cate);
  const handlePress = () => {
    dispatch(
      SetInfoProfile({
        cate: cate,
        skill: skill,
        exper: exper,
        location: location,
      })
    );
    dispatch(
      ChartFilter({
        cate: cate,
        exper: exper,
        location: location,
      })
    );
    navigation.goBack();
  };
  return (
    <View>
      <Text
        style={{
          color: COLORS.primary,
          alignSelf: "center",
          ...FONTS.h2,
          fontSize: 24,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Set up profile
      </Text>
      <Picker
        name="Chuyên ngành"
        listItem={CateList}
        zIndex={5000}
        sendValue={setCate}
        placeholder="Chọn chuyên ngành bạn muốn làm việc"
        defaultValue={cate}
      />
      <Picker
        name="Kỹ năng"
        listItem={SkillList}
        zIndex={4000}
        sendValue={setSkill}
        placeholder="Chọn những kỹ năng mà bạn có"
        multi={true}
        searchable={true}
        defaultValue={skill}
      />
      <Picker
        name="Kinh nghiệm"
        listItem={ExperList}
        zIndex={3000}
        sendValue={setExper}
        placeholder="Chọn mức kinh nghiệm đúng với bạn"
        defaultValue={exper}
      />
      <Picker
        name="Khu vực"
        listItem={LocationList}
        zIndex={2000}
        sendValue={setLocation}
        placeholder="Chọn khu vực sống của bạn"
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
          onPress={() => navigation.goBack}
        >
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Hủy bỏ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
