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
    <TextInput label="Post ID" source="postId" alwaysOn />
    <TextInput label="Created by (UID)" source="uid" />
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
    <SelectInput
      label="Public Status"
      source="publicStatus"
      choices={[
        { id: 1, name: "Public" },
        { id: 0, name: "Private" },
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
          format={(value) =>
            value.length > 100 ? `${value.substring(0, 100)}...` : value
          }
        />
        <TextField source="sectionId" label="Section ID" sortable={true} />
        <DateField source="createdAt" label="Created At" sortable={true} />
        {/* Removed Updated At column */}
        <FunctionField
          label="Created by"
          render={(record) => {
            const username = record.username || "Unknown";
            return `${record.uid} (${username})`;
          }}
        />
        <FunctionField
          source="status"
          label="Status"
          sortable={true}
          render={(record) => (record.status === 1 ? "Done" : "Todo")}
        />
        <FunctionField
          source="publicStatus"
          label="Public Status"
          sortable={true}
          render={(record) =>
            record.publicStatus === 1 ? "Public" : "Private"
          }
        />
        <ImageField
          source="imageUri"
          title="Image"
          label="Image"
          sx={{
            "& img": { maxWidth: 150, maxHeight: 150, objectFit: "contain" },
          }}
        />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default PostList;
