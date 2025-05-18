import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  useRecordContext,
} from "react-admin";

const statusChoices = [
  { id: 0, name: "Pending" },
  { id: 1, name: "Reviewed" },
  { id: 2, name: "Resolved" },
];

const PostImagePreview = () => {
  const record = useRecordContext();
  return record && record.postImageUri ? (
    <img
      src={record.postImageUri}
      alt={`Post ${record.postId}`}
      style={{ maxHeight: 100, maxWidth: 100, marginBottom: 10 }}
    />
  ) : (
    <div>No Image</div>
  );
};

const ReportEdit = (props) => {
  return (
    <Edit {...props} title="Edit Report">
      <SimpleForm>
        <TextInput source="id" disabled label="Report ID" />
        <TextInput source="reporterId" label="Reporter ID" disabled />
        <TextInput
          source="reporterUsername"
          label="Reporter Username"
          disabled
        />
        <TextInput source="postId" label="Post ID" disabled />

        <PostImagePreview />

        <TextInput
          source="postContent"
          label="Post Content"
          multiline
          disabled
          fullWidth
          helperText="Original content of the reported post"
        />

        <TextInput
          multiline
          source="reason"
          label="Reason for Report"
          fullWidth
        />

        <SelectInput source="status" choices={statusChoices} label="Status" />

        <BooleanInput
          source="isViewed"
          label="Viewed"
          parse={(v) => (v ? 1 : 0)}
          format={(v) => Boolean(v)}
        />
      </SimpleForm>
    </Edit>
  );
};

export default ReportEdit;
