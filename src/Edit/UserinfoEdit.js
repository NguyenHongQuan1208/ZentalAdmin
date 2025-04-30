import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
} from "react-admin";

export const UserinfoEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="bio" />

      <ImageField
        source="photoUrl"
        title="Profile Picture"
        label="Current Profile Picture"
      />

      <ImageInput
        source="photoUrl"
        label="Upload New Profile Picture"
        accept="image/*"
      >
        <ImageField source="photoUrl" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
