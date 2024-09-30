import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const uploadFile = (selectedFile: FileList) => {
  const logoRef = ref(storage, "images/shopinn/" + selectedFile[0].name);
  return uploadBytes(logoRef, selectedFile[0], {
    contentType: "image/jpeg",
  })
    .then(() => getDownloadURL(logoRef))
    .then((url) => url)
    .catch((error) => {
      console.log(error);
      getStorageErrorMessage(error.code);
    });
};

export default uploadFile;

function getStorageErrorMessage(errorCode: string) {
  switch (errorCode) {
    case "storage/unknown":
      return { error: "Unknown error occurred." };
      break;
    case "storage/object-not-found":
      return { error: "Object not found." };
      break;
    case "storage/unauthenticated":
      return { error: "User unauthenticated. Please log in." };
      break;
    case "storage/unauthorized":
      return { error: "User unauthorized. Check security rules." };
      break;
    case "storage/retry-limit-exceeded":
      return { error: "Retry limit exceeded. Try again." };
      break;
    case "storage/invalid-checksum":
      return { error: "Checksum mismatch. Try again." };
      break;
    case "storage/invalid-url":
      return { error: "Invalid URL format." };
      break;
    case "storage/cannot-slice-blob":
      return { error: "File changed. Verify and try again." };
      break;
    case "storage/server-file-wrong-size":
      return { error: "Server file size mismatch." };
      break;
    default:
      return { error: "Unknown error occurred." };
  }
}

export const authRedirect = (router: AppRouterInstance, error: { response: { status: number; }; request: any; message: any; }) => {
  if (error.response) {
    if (error.response.status === 401) {
      router.push("/signin");
      return;
    }

    console.log(error);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
}