import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  EditButton,
  DeleteButton,
} from "react-admin";

const ReportList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <ReferenceField source="postId" reference="posts" label="Post" />
        <TextField source="reason" label="Reason" />
        <DateField source="timestamp" label="Timestamp" />
        <TextField source="repporterId" label="Reporter ID" />
        <TextField source="isViewed" label="Viewed" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ReportList;
