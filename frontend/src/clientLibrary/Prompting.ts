import { BACKEND_API } from "../constants";

export interface FeedbackPayload {
  prompt: string;
  response: string;
  rating: string;
  type: string;
}

export const sendFeedback = async (feedback: FeedbackPayload) => {
  try {
    const response = await fetch(`${BACKEND_API}/feedback/general`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(`Error, An error occurred sending your feedback. ${error}`);
    return error;
  }
};

export const getPromptResponse = async (prompt: string, type: string) => {
  try {
    const response = await fetch(
      `${BACKEND_API}/prompting/expert?message=${prompt}&type=${type}`,
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
    alert(`Error, An error occurred getting an AI response. ${error}`);
    return error;
  }
};

// Career Craft
export interface CareerCraftPayload {
  resume: string;
  jobDesc: string;
  extra: string;
  isCasual?: boolean;
  isHumorous?: boolean;
  isConcise?: boolean;
  isEmoji?: boolean;
}

export const getCoverLetterResponse = async (payload: CareerCraftPayload) => {
  try {
    const response = await fetch(`${BACKEND_API}/prompting/cover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

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

export const getResumeFeedback = async (payload: CareerCraftPayload) => {
  try {
    const response = await fetch(`${BACKEND_API}/prompting/resume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume: payload.resume,
        jobDesc: payload.jobDesc,
        extra: payload.extra,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(
      `Error, An error occurred getting your resume feedback. Error: ${error}`
    );
    return error;
  }
};

export const getResumeRewrite = async (payload: CareerCraftPayload) => {
  try {
    const response = await fetch(`${BACKEND_API}/prompting/rewrite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume: payload.resume,
        jobDesc: payload.jobDesc,
        extra: payload.extra,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    alert(
      `Error, An error occurred getting your resume rewrite. Error: ${error}`
    );
    return error;
  }
};

export const getEmailResponse = async (original: string, goal: string) => {
  try {
    const response = await fetch(
      `${BACKEND_API}/prompting/email?original=${original}&goal=${goal}`,
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
    alert(`Error, An error occurred getting your e-mail response. ${error}`);
    return error;
  }
};
