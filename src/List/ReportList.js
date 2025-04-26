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
        <ReferenceField source="postId" reference="posts" />
        <TextField source="reason" />
        <DateField source="timestamp" />
        <TextField source="repporterId" label="Reporter Id" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ReportList;
