import React from "react";
import { List, Datagrid, TextField, EmailField, ImageField } from "react-admin";

const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="bio" />
      <ImageField source="photoUrl" title="username" />
    </Datagrid>
  </List>
);

export default UserList;
