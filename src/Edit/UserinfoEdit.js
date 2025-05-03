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

export const UserinfoEdit = () => (
  <Edit title="Edit User Information">
    <SimpleForm>
      {/* Personal Information Section */}
      <Box sx={{ marginBottom: 3, width: "100%", maxWidth: "800px" }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <TextInput
            source="id"
            disabled
            label="User ID"
            sx={{ flex: "1 1 45%" }}
          />
          <TextInput
            source="username"
            label="Username"
            validate={[required()]}
            sx={{ flex: "1 1 45%" }}
          />
          <TextInput
            source="email"
            label="Email"
            validate={[required(), email()]}
            sx={{ flex: "1 1 100%" }}
          />
          <TextInput
            source="bio"
            label="Biography"
            multiline
            rows={4}
            helperText="A short description about the user"
            sx={{ flex: "1 1 100%" }}
          />
        </Box>
      </Box>

      {/* Profile Picture Section */}
      <Box sx={{ marginBottom: 3, width: "100%", maxWidth: "800px" }}>
        <Typography variant="h6" gutterBottom>
          Profile Picture
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            alignItems: "center",
          }}
        >
          {/* Display Current Profile Picture */}
          <Box sx={{ flex: "1 1 30%", minWidth: "150px" }}>
            <Typography variant="subtitle1" gutterBottom>
              Current Picture
            </Typography>
            <ImageField
              source="photoUrl"
              title="Profile Picture"
              emptyText="No profile picture set"
              sx={{
                "& img": {
                  maxWidth: "120px",
                  maxHeight: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #e0e0e0",
                },
              }}
            />
          </Box>

          {/* Upload New Profile Picture */}
          <Box sx={{ flex: "1 1 60%", minWidth: "200px" }}>
            <Typography variant="subtitle1" gutterBottom>
              Upload New Picture
            </Typography>
            <ImageInput
              source="photoUrl"
              label={false} // Hide default label to use custom Typography
              accept="image/*"
              maxSize={5000000} // Limit to 5MB
              helperText="Upload a new profile picture (Max size: 5MB, Format: JPG, PNG)"
            >
              <ImageField
                source="src"
                title="title"
                sx={{
                  "& img": {
                    maxWidth: "100px",
                    maxHeight: "100px",
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
