import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  ImageField,
} from "react-admin";

const PostList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="sectionId" label="Section ID" />
        <TextField source="title" label="Title" />
        <TextField source="content" label="Content" />
        <DateField source="createdAt" label="Created At" />
        <DateField source="updatedAt" label="Updated At" />
        <TextField source="uid" label="Created by" />
        <TextField source="status" label="Status" />
        <ImageField source="imageUri" title="Image" label="Image" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default PostList;
