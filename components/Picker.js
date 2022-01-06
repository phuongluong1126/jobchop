import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, FONTS, SIZES } from "../constants";
import { Keyboard } from "react-native";
DropDownPicker.setMode("BADGE");
export default function Picker({
  name,
  listItem,
  zIndex,
  multi,
  searchable,
  placeholder,
  sendValue,
  defaultValue,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue?defaultValue:null);
  const [items, setItems] = useState(listItem);

  return (
    <View>
      <Text
        style={{
          marginLeft: SIZES.padding,
          color: COLORS.primary,
          ...FONTS.h2,
        }}
      >
        {name}
      </Text>
      <View style={styles.container}>
        <DropDownPicker
          zIndex={zIndex}
          multiple={multi ? multi : false}
          min={0}
          max={5}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(value) => {
            sendValue(value);
            setValue(value);
            // console.log("on click value");
          }}
          setItems={setItems}
          searchable={searchable ? searchable : false}
          style={{ borderColor: COLORS.primary }}
          itemStyle={{ backgroundColor: COLORS.black }}
          placeholder={placeholder}
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
