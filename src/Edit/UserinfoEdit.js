import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  required,
  email,
} from "react-admin";
import { Box, Typography, Divider } from "@mui/material";

const UserinfoEdit = () => (
  <Edit
    title="Edit User Information"
    transform={(data) => {
      console.log("Data being sent for update:", data);
      if (!data.id) {
        console.warn("ID is undefined in form data!");
        delete data.id;
      }
      return data;
    }}
  >
    <SimpleForm>
      {/* Phần thông tin cá nhân - Tối ưu hóa không gian */}
      <Box sx={{
        marginBottom: 4,
        width: "100%",
        maxWidth: "800px",
        "& .RaTextInput-root": { marginBottom: 2 }
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Personal Information
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextInput
            source="id"
            disabled
            label="User ID"
            sx={{ flex: "1 1 100%" }}
          />
          <TextInput
            source="username"
            label="Username"
            validate={[required()]}
            sx={{ flex: "1 1 45%", minWidth: 250 }}
          />
          <TextInput
            source="email"
            label="Email"
            validate={[required(), email()]}
            sx={{ flex: "1 1 45%", minWidth: 250 }}
          />
          <TextInput
            source="bio"
            label="Biography"
            multiline
            rows={4}
            fullWidth
            helperText="A short description about the user"
          />
        </Box>
      </Box>

      {/* Phần ảnh đại diện - Cải thiện visual hierarchy */}
      <Box sx={{
        marginBottom: 4,
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "rgba(0, 0, 0, 0.02)",
        p: 3,
        borderRadius: 1
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Profile Picture
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box sx={{
            flex: "1 1 30%",
            minWidth: 200,
            textAlign: "center"
          }}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
              Current Picture
            </Typography>
            <ImageField
              source="photoUrl"
              title="Profile Picture"
              emptyText="No image"
              sx={{
                "& img": {
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #e0e0e0",
                },
              }}
            />
          </Box>

          <Box sx={{
            flex: "1 1 60%",
            minWidth: 300,
            "& .RaImageInput-dropZone": {
              border: "2px dashed #e0e0e0",
              borderRadius: 1,
              p: 3,
              textAlign: "center"
            }
          }}>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
              Upload New Picture
            </Typography>
            <ImageInput
              source="photoUrl"
              label={false}
              accept="image/*"
              maxSize={5000000}
              helperText="Max size: 5MB (JPG, PNG)"
            >
              <ImageField
                source="src"
                title="title"
                sx={{
                  "& img": {
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                  },
                }}
              />
            </ImageInput>
          </Box>
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

export default UserinfoEdit;
