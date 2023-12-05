import { BACKEND_API } from "../constants";

export const getPromptResponse = async (prompt: string, type: string) => {
  try {
    const response = await fetch(
      `${BACKEND_API}/prompting?message=${prompt}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(`Error, An error occurred during login. ${error}`);
    return error;
  }
};

export const getCoverLetterResponse = async (
  resume: string,
  jobDesc: string
) => {
  try {
    const response = await fetch(
      `${BACKEND_API}/prompting/cover?resume=${resume}&jobDesc=${jobDesc}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert("Error, An error occurred during login.");
    return error;
  }
};
