import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  ImageField,
  Filter,
  SelectInput,
  TextInput,
  FunctionField,
} from "react-admin";

// Custom filter component for the list
const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search Title" source="title" alwaysOn />
    <SelectInput
      label="Status"
      source="status"
      choices={[
        { id: 1, name: "Done" },
        { id: 0, name: "Todo" },
      ]}
    />
    <SelectInput
      label="Section ID"
      source="sectionId"
      choices={[
        { id: "s1", name: "S1" },
        { id: "s2", name: "S2" },
        { id: "s3", name: "S3" },
        { id: "s4", name: "S4" },
        { id: "s5", name: "S5" },
        { id: "s6", name: "S6" },
      ]}
    />
  </Filter>
);

const PostList = (props) => {
  return (
    <List {...props} filters={<PostFilter />} title="Posts">
      <Datagrid>
        <TextField source="id" label="ID" sortable={true} />
        <TextField source="title" label="Title" sortable={true} />
        <TextField
          source="content"
          label="Content"
          sortable={false}
          // Truncate long content
          format={(value) =>
            value.length > 100 ? `${value.substring(0, 100)}...` : value
          }
        />
        <TextField source="sectionId" label="Section ID" sortable={true} />
        <DateField source="createdAt" label="Created At" sortable={true} />
        <DateField source="updatedAt" label="Updated At" sortable={true} />
        <TextField source="uid" label="Created by" sortable={false} />
        <FunctionField
          source="status"
          label="Status"
          sortable={true}
          render={(value) => (value.status === 1 ? "Done" : "Todo")}
        />
        <ImageField
          source="imageUri"
          title="Image"
          label="Image"
          sx={{
            "& img": { maxWidth: 50, maxHeight: 50, objectFit: "contain" },
          }}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default PostList;
