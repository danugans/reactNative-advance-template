import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, RefreshControl } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

// Import Axios
import axios from "axios";

const PostDetail = (props) => {
  //init Props
  // const title = props.route.params.title;
  // const body = props.route.params.body;
  // const id = props.route.params.id;

  const { title, id, body } = props.route.params;

  //Init State
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Create LifeCycle
  //Function Exception
  useEffect(() => {
    getComment();
  }, []);

  // Create Function to fetch

  const getComment = () => {
    setIsLoading(true);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("error get comment");
        setIsLoading(false);
      });
  };

  //   Create Component List
  const _renderItem = ({ item }) => {
    return (
      <ListItem key={item.id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title numberOfLines={1}>{item.email}</ListItem.Title>
          <ListItem.Subtitle numberOfLines={2}>{`${item.name} - ${item.body}`}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };
  return (
    <View style={style.container}>
      <Text h2 style={{ fontWeight: "bold" }}>
        {title}
      </Text>
      <Text style={{ marginTop: 20 }}>{body}</Text>
      <Text style={{ marginTop: 20 }}>Comments</Text>
      {/* Implement Axios Here */}
      {/* Render Component List */}
      <FlatList data={comments} renderItem={_renderItem} keyExtractor={(item) => item.id} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getComment} />} />
    </View>
  );
};

export default PostDetail;

const style = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    padding: 16,
    flex: 1,
  },
});
