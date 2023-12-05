import { BACKEND_API } from "../constants";

export const getPromptResponse = async (prompt: string) => {
  try {
    const response = await fetch(`${BACKEND_API}/prompting?message=${prompt}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(`Error, An error occurred getting an AI response. ${error}`);
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
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(
      `Error, An error occurred getting your cover letter. Error: ${error}`
    );
    return error;
  }
};
