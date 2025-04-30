import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  SelectInput,
} from "react-admin";

const PostEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="content" multiline />

      <ImageField
        source="imageUri"
        title="Current Image"
        label="Current Image"
      />

      <ImageInput source="imageUri" label="Upload New Image" accept="image/*">
        <ImageField source="imageUri" title="title" />
      </ImageInput>

      <TextInput source="sectionId" />
      <SelectInput
        source="publicStatus"
        choices={[
          { id: 1, name: "Public" },
          { id: 0, name: "Private" },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export default PostEdit;
