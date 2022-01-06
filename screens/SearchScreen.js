import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { COLORS, FONTS, jobs, SIZES } from "../constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  CompanyItem,
  HeaderBar,
  Heading,
  JobItem,
  Picker,
} from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import DropDownPicker from "react-native-dropdown-picker";
import { URL } from "../api";
const Tab = createMaterialTopTabNavigator();
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

export default function SearchScreen({}) {
  const listJobs = useSelector((state) => state.job.listJobs);
  const listCompanies = useSelector((state) => state.job.listCompanies);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(SkillList);
  const searchFilter = useSelector((state) => state.job.searchFilter);
  // console.log('SEARCH FILTER', searchFilter);

  const [foundJobs, setFoundJobs] = useState(listJobs.slice(0, 10));
  const [foundCompanies, setFoundCompanies] = useState(
    listCompanies.slice(0, 10)
  );

  const navigation = useNavigation();

  useEffect(() => {
    // console.log("vaulue", value);
    console.log("listcompany", listCompanies.length);

    value.length > 0 && console.log(value[0]);
    let tempList = [];
    if (value.length > 0) {
      listCompanies.forEach((item) => {
        let count = 0;
        item.key_skill.forEach((skill) => {
          value.forEach((element) => {
            if (skill.toLowerCase() == element.toLowerCase()) {
              count++;
            }
          });
        });
        // if (count == value.length) tempList.push(item);
        if (count > 0) tempList.push(item);
      });
    }
    // console.log("foundCompany", tempList.length);
    // if (tempList.length > 0 || searchFilter) {
    //   if (searchFilter.type) {
    //     console.log("searchFilter.type in searh screen", searchFilter.type);
    //     tempList = tempList.filter(
    //       (item) => item["typeCompany"] == searchFilter.type
    //     );
    //   }
    //   setFoundCompanies(tempList);
    // }
    // Result jobs
    if (value.length > 0) {
      let stringSkill = "";
      value.map((item, index) =>
        index > 0
          ? (stringSkill = stringSkill.concat("|", item))
          : (stringSkill = stringSkill.concat(item))
      );
      if (stringSkill.length > 0) {
        const link = `${URL}/search?skill=${stringSkill}`;
        fetch(link)
          .then((res) => res.json())
          .then((data) => {
            const tempListJobs = data.map((item) => {
              const job = listJobs.find((element) => element.Id == item["id"]);
              if (job) {
                job.score = Math.round(item["similar"] * 100);
                // console.log('job.score',  job.score);
                return job;
              }
            });
            // console.log("tempListJobs", tempListJobs.length);
            if (tempListJobs.length > 0) setFoundJobs(tempListJobs);
            else setFoundJobs([]);
          });
      }
    }
  }, [value, searchFilter]);

  const FoundJobs = () => {
    if (foundJobs.length > 0)
      return (
        <FlatGrid
          itemDimension={130}
          data={foundJobs}
          style={styles.gridView}
          spacing={10}
          renderItem={({ item }) =>
            item && (
              <JobItem
                item={item}
                index={item["Id"]}
                key={`FoundJobs${item["Id"]}`}
              />
            )
          }
        />
      );
    else return <Text>No result</Text>;
  };

  const FoundCompanies = () => (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        {foundCompanies.length > 0 ? (
          searchFilter ? (
            listCompanies.map(
              (item) =>
                searchFilter.type &&
                searchFilter.type == item.typeCompany && (
                  <CompanyItem
                    item={item}
                    big
                    index={item.ids}
                    key={`FoundCompanies${item.ids}`}
                  />
                )
            )
          ) : (
            listCompanies
              .slice(0, 10)
              .map((item) => (
                <CompanyItem
                  item={item}
                  big
                  index={item.ids}
                  key={`FoundCompanies${item.ids}`}
                />
              ))
          )
        ) : (
          <Text>No company can found</Text>
        )}
      </View>
    </ScrollView>
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 5,
      }}
    >
      <HeaderBar filter />
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          paddingTop: 5,
        }}
      >
        <View style={styles.container}>
          <DropDownPicker
            activityIndicatorSize={200}
            zIndex={5000}
            multiple={true}
            min={0}
            max={5}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(value) => {
              // sendValue(value);
              setValue(value);
              // console.log('on click value');
            }}
            setItems={setItems}
            searchable={true}
            style={{ borderColor: COLORS.primary }}
            itemStyle={{ backgroundColor: COLORS.black }}
            placeholder="Tìm kiếm theo kỹ năng"
            dropDownContainerStyle={{ borderColor: COLORS.primary }}
            searchContainerStyle={{
              borderBottomColor: COLORS.primary,
              padding: 0,
            }}
            searchTextInputStyle={{
              borderRadius: 0,
              borderWidth: 0,
            }}
            arrowIconStyle={{ tintColor: COLORS.primary }}
            searchPlaceholder="Search..."
          />
        </View>
        <TouchableOpacity
          style={styles.sortBtn}
          onPress={() => navigation.navigate("FilterScreen")}
        >
          <Feather name="sliders" size={28} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            justifyContent: "center",
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
            width: "40%",
            left: 20,
          },
        }}
      >
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                Công việc
              </Text>
            ),
          }}
          component={FoundJobs}
          name="FoundJobs"
        />
        <Tab.Screen
          options={{
            title: () => (
              <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>
                Nhà tuyển dụng
              </Text>
            ),
          }}
          component={FoundCompanies}
          name="FoundCompanies"
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gridView: {
    margin: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
});
