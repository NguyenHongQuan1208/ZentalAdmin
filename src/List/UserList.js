import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ImageField,
  EditButton,
  DeleteButton,
  SearchInput,
  Filter,
} from "react-admin";
import { styled } from "@mui/material/styles";

const StyledDatagrid = styled(Datagrid)(({ theme }) => ({
  "& .RaDatagrid-row": {
    height: "100px",
    "& td": {
      verticalAlign: "middle",
    },
  },
}));

const ImageCell = styled("div")({
  width: "100px",
  "& img": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

const EmptyImagePlaceholder = styled("div")(({ theme }) => ({
  width: "100px",
  height: "100px",
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}));

// Custom Filter Component with SearchInput
const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn placeholder="Search Users..." />
  </Filter>
);

const UserList = () => {
  return (
    <List filters={<UserFilter />}>
      <StyledDatagrid>
        <TextField source="id" label="ID" />
        <TextField source="username" label="User Name" />
        <EmailField source="email" label="Email" />
        <TextField source="bio" label="Biography" />
        <ImageField
          source="photoUrl"
          title="username"
          label="Profile Picture"
          cellClassName={ImageCell}
          empty={<EmptyImagePlaceholder>No Image</EmptyImagePlaceholder>}
        />
        <EditButton />
        <DeleteButton />
      </StyledDatagrid>
    </List>
  );
};

export default UserList;
