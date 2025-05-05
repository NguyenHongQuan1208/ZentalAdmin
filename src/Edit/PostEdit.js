import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  SelectInput,
  FormTab,
  TabbedForm,
} from "react-admin";

const PostEdit = (props) => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Content">
        <TextInput
          source="title"
          fullWidth
          variant="outlined"
        />
        <TextInput
          source="content"
          multiline
          fullWidth
          rows={10}
          variant="outlined"
        />
      </FormTab>

      <FormTab label="Media">
        <ImageField
          source="imageUri"
          title="Current Image"
          label="Current Image"
          sx={{ mb: 2 }}
        />
        <ImageInput
          source="imageUri"
          label="Upload New Image"
          accept="image/*"
          sx={{ mt: 2 }}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </FormTab>

      <FormTab label="Settings">
        <TextInput
          source="sectionId"
          disabled
          fullWidth
          variant="outlined"
        />
        <SelectInput
          source="publicStatus"
          choices={[
            { id: 1, name: "Public" },
            { id: 0, name: "Private" },
          ]}
          fullWidth
          variant="outlined"
        />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export default PostEdit;
