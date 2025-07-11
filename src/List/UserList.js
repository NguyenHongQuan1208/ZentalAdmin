import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DeleteButton,
  SearchInput,
  Filter,
  FunctionField,
  TextInput,
} from "react-admin";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";

const StyledDatagrid = styled(Datagrid)(({ theme }) => ({
  "& .RaDatagrid-row": {
    height: "100px",
    "& td": {
      verticalAlign: "middle",
    },
  },
  "& .column-avatar": {
    width: "120px",
  },
}));

const ImageCell = styled("div")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  overflow: "hidden",
  "& img": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

const EmptyImagePlaceholder = styled(Avatar)(({ theme }) => ({
  width: "80px",
  height: "80px",
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.secondary,
}));

const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput
      source="q"
      alwaysOn
      placeholder="Search by id, name, email,..."
      fullWidth
    />
    <TextInput
      label="Username"
      source="username"
      placeholder="Filter by username"
    />
    <TextInput label="Email" source="email" placeholder="Filter by email" />
  </Filter>
);

const UserList = () => {
  return (
    <List filters={<UserFilter />} perPage={25}>
      <StyledDatagrid rowClick="edit" optimized>
        <TextField source="id" label="ID" />
        <FunctionField
          label="Avatar"
          render={(record) =>
            record.photoUrl ? (
              <ImageCell>
                <img src={record.photoUrl} alt={record.username} />
              </ImageCell>
            ) : (
              <EmptyImagePlaceholder>
                {record.username?.charAt(0)?.toUpperCase() || "?"}
              </EmptyImagePlaceholder>
            )
          }
          className="column-avatar"
        />

        <TextField source="username" label="Username" />
        <EmailField source="email" label="Email" />

        <TextField source="bio" label="Bio" ellipsis cellClassName="bio-cell" />

        <EditButton />
        <DeleteButton mutationMode="pessimistic" />
      </StyledDatagrid>
    </List>
  );
};

export default UserList;
