import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView
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
  SetSearchFilter,
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

export default function SetupProfile() {
  function strToArr1(str) {
    let tempArr = [];
    tempArr = str.replace(/[\[\]]/g, "");
    tempArr = tempArr.replace(/1\\n/g, "");
    tempArr = tempArr.replace(/2\\n/g, "");
    tempArr = tempArr.replace(/3\\n/g, "");
    tempArr = tempArr.replace(/4\\n/g, "");
    tempArr = tempArr.replace(/\\n/g, "");
    tempArr = tempArr.split("', '");
    tempArr[0] = tempArr[0].replace(/'/g, "");
    tempArr[tempArr.length - 1] = tempArr[tempArr.length - 1].replace(/'/g, "");
    return tempArr;
  }
  function strToArr2(str) {
    let tempArr = [];
    tempArr = str.replace(/[\[\]]/g, "");
    tempArr = tempArr.split("', '");
    tempArr[0] = tempArr[0].replace(/'/g, "");
    tempArr[tempArr.length - 1] = tempArr[tempArr.length - 1].replace(/'/g, "");
    return tempArr;
  }
  function cleanString(str) {
    let tempArr = [];
    tempArr = str.replace(/['\[\]]/g, "");
    tempArr = tempArr.replace(/\\n/g, " ");

    return tempArr;
  }
  const info = useSelector((state) => state.job.infoUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [skill, setSkill] = useState(null);
  const [exper, setExper] = useState(null);
  const [cate, setCate] = useState(null);
  useEffect(() => {
    console.log("get data here");
    getAllJobs()
      .then((data) => {
        console.log("number of jobs", data.length);
        let listJobs = [];
        data.forEach((item) => {
          let tempJob = item;
          tempJob.Benefits = strToArr2(tempJob.Benefits);
          tempJob["Job Desription"] = strToArr2(tempJob["Job Desription"]);
          tempJob.Province = strToArr2(tempJob.Province);
          tempJob.Requirements = strToArr2(tempJob.Requirements);
          listJobs.push(tempJob);
        });
        dispatch(SetJobs(listJobs));
        getAllCompanies().then((companies) => {
          const listUnique = [
            ...new Set(companies.map((item) => item.company)),
          ];
          let listCompanies = [];
          listUnique.forEach((item) => {
            let tempCom = companies.find((com) => com.company === item);
            const listJobs = data.filter((com) => com["Company Name"] === item);
            tempCom.listJobs = listJobs;
            tempCom["why_you_work_here"] = strToArr1(
              tempCom["why_you_work_here"]
            );
            tempCom.address = cleanString(tempCom.address);
            tempCom.key_skill = strToArr2(tempCom.key_skill);
            tempCom.overview = strToArr2(tempCom.overview);
            tempCom.description = strToArr2(tempCom.description);

            listCompanies.push(tempCom);
          });
          console.log("number of company", listCompanies.length);
          dispatch(SetCompanies(listCompanies));
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // if (skill || location || exper || cate) {
  //   console.log(skill, location, exper, cate);
  // }
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
        cate: cate ? cate : "Lập trình viên FullStack",
        exper: exper ? exper : "Senior & Upper",
        location: location ? "Khác" ? "Hà Nội" : location: "Hà Nội",
      })
    );
    // dispatch(SetSearchFilter({ location: location }));
    navigation.navigate("BottomNavigation");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        // paddingTop: Platform.OS === "android" ? 20 : 0,
      }}
    >
      <Text
        style={{
          color: COLORS.primary,
          alignSelf: "center",
          ...FONTS.h2,
          fontSize: 24,
          marginTop: 30,
          marginBottom: 10,
          // paddingBottom: 30
        }}
      >
        Set up profile
      </Text>
      <Picker
        name="Chuyên ngành"
        listItem={CateList}
        zIndex={5000}
        sendValue={setCate}
        placeholder="Chọn chuyên ngành của bạn"
      />
      <Picker
        name="Kỹ năng"
        listItem={SkillList}
        zIndex={4000}
        sendValue={setSkill}
        placeholder="Chọn những kỹ năng mà bạn có"
        multi={true}
        searchable={true}
      />
      <Picker
        name="Kinh nghiệm"
        listItem={ExperList}
        zIndex={3000}
        sendValue={setExper}
        placeholder="Chọn mức kinh nghiệm đúng với bạn"
      />
      <Picker
        name="Khu vực"
        listItem={LocationList}
        zIndex={2000}
        sendValue={setLocation}
        placeholder="Chọn khu vực sống của bạn"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert("Left button pressed")}
        >
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Hủy bỏ
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={{ color: COLORS.white, lineHeight: 25, ...FONTS.h2 }}>
            Tiếp tục
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
    margin: 10,
    width: 110,
  },
});
