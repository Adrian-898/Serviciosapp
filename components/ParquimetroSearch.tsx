import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useQuery } from "@tanstack/react-query";

const fetchOptions = async () => {
  const response = await fetch("https://your-api-endpoint.com/data"); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const MyDropdown = () => {
  const { data, error, isLoading } = useQuery("options", fetchOptions);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return (
    <View>
      <SelectDropdown
        data={data} // Assuming the data is an array of strings or objects
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label || selectedItem; // Adjust based on your data structure
        }}
        rowTextForSelection={(item, index) => {
          return item.label || item; // Adjust based on your data structure
        }}
        defaultButtonText="Select an option"
        buttonStyle={{
          width: "80%",
          backgroundColor: "#f0f0f0",
          borderRadius: 5,
        }}
        buttonTextStyle={{ color: "#444" }}
        dropdownStyle={{ backgroundColor: "#fff" }}
        rowStyle={{
          backgroundColor: "#fff",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
        rowTextStyle={{ color: "#444" }}
      />
    </View>
  );
};

export default MyDropdown;
