import React, { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const showToast = useShowToast(); // Custom hook for displaying toast notifications
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file

  const maxFileSizeInBytes = 2 * 1024 * 1024; // Maximum file size set to 2MB

  const handleChangeImage = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    if (file && file.type.startsWith("image/")) {
      // Check if the file is an image
      if (file.size > maxFileSizeInBytes) {
        // Check if the file size exceeds the limit
        showToast("Error", "File size must be less than 2MB");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onloadend = () => {
        setSelectedFile(reader.result); // Set the file data as the selected file
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null); // Reset the selected file if not an image
    }
  };

  return { selectedFile, handleChangeImage, setSelectedFile }; // Return the state and handler
};

export default usePreviewImage;
