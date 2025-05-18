import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  FunctionField,
  Filter,
  SelectInput,
} from "react-admin";

const statusLabels = {
  0: "Pending",
  1: "Reviewed",
  2: "Resolved",
};

const ReportFilter = (props) => (
  <Filter {...props}>
    <SelectInput
      source="isViewed"
      label="Viewed Status"
      choices={[
        { id: "", name: "All" },
        { id: true, name: "Viewed" },
        { id: false, name: "Not Viewed" },
      ]}
      alwaysOn
    />
  </Filter>
);

const ReportList = (props) => {
  return (
    <List {...props} filters={<ReportFilter />}>
      <Datagrid rowClick="edit">
        <TextField source="postId" label="Post ID" />
        <FunctionField
          label="Post Image"
          render={(record) =>
            record.postImageUri ? (
              <img
                src={record.postImageUri}
                alt="Post"
                style={{ maxHeight: 50, maxWidth: 50 }}
              />
            ) : (
              "No Image"
            )
          }
        />
        <FunctionField
          label="Post Content"
          render={(record) => (
            <span
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: 200,
                display: "inline-block",
              }}
            >
              {record.postContent || "No Content"}
            </span>
          )}
        />
        <TextField source="reason" label="Reason" />
        <DateField source="timestamp" label="Timestamp" />
        <TextField source="reporterId" label="Reporter ID" />
        <TextField source="reporterUsername" label="Reporter" />
        <FunctionField
          label="Status"
          render={(record) => statusLabels[record.status] || "Unknown"}
        />
        <TextField source="isViewed" label="Viewed" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default ReportList;
