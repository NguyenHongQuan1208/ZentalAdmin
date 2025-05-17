import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const ReportList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="postId" label="Post ID" />
        <TextField source="reason" label="Reason" />
        <DateField source="timestamp" label="Timestamp" />
        <TextField source="reporterId" label="Reporter ID" />
        <TextField source="reporterUsername" label="Reporter" />
        <TextField source="isViewed" label="Viewed" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ReportList;
