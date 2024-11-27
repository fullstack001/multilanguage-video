import axiosInstance, { AxiosProgressEvent } from "./axios";

// Use the standard ProgressEvent type
type ProgressCallback = (progress: AxiosProgressEvent) => void;

export const translateVideo = (
  formData: FormData,
  onProgress?: ProgressCallback,
) => {
  return axiosInstance
    .post("/api/translate", formData, {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (onProgress) {
          onProgress(progressEvent);
        }
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      // Handle API errors and forward them to the error handler
      handleApiError(error);
    });
};

const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    console.error("Unauthorized access, signing out...");
    logout();
  } else {
    console.error("API error:", error.message || "Unknown error occurred");
  }
  throw error; // Re-throw the error to propagate it back to the caller
};

// Logout function should be properly defined and reusable
export const logout = () => {
  localStorage.removeItem("token"); // Adjust based on your token storage
  window.location.href = "/"; // Redirect to login or home page
};
