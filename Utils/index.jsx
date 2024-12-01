import axios from "axios";
import OpenAI from "openai";

const OpenAi = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

function extractImageUrls(imageArray) {
  return imageArray.map((image) => image.url);
}

export const REGISTER_USER = async (signUp) => {
  const { name, email, password, confirmPassword } = signUp;

  if (!name || !email || !password || !confirmPassword)
    return "Data is missing";

  if (password != confirmPassword) return "password is not matching";

  const resppone = await axios({
    method: "POST",
    url: "/api/auth/register",
    withCredentials: true,
    data: {
      username: name,
      email: email,
      password: password,
    },
  });
  if (resppone.status == 201) {
    window.location.href = "/";
  }
};

export const LOGIN_USER = async (login) => {
  const { email, password } = login;

  if (!email || !password) return "Data is missing";

  const resppone = await axios({
    method: "POST",
    url: "/api/auth/login",
    withCredentials: true,
    data: {
      email: email,
      password: password,
    },
  });
  if (resppone.status == 200) {
    window.location.href = "/";
  }
};

export const LOGOUT_USER = async () => {
  const response = await axios({
    method: "GET",
    url: "/api/auth/logout",
    withCredentials: true,
  });

  if (response.status === 200) {
    window.location.href = "/login";
  }
};

export const CHECK_AUTH = async () => {
  const response = await axios({
    method: "GET",
    url: "/api/auth/refetch",
    withCredentials: true,
  });
  let user;

  if (response.status === 200) {
    user = response.data;
  }
  return user;
};

export const LIKE_POST = async (postId) => {
  const currentUser = await CHECK_AUTH();
  if (!currentUser) return "User not logged in";

  const response = await axios({
    method: "POST",
    url: `/api/post/like/${postId}`,
    withCredentials: true,
    data: {
      userId: currentUser._id,
    },
  });

  if (response.status === 200) {
    return response;
  }
};

export const DISLIKE_POST = async (postId) => {
  const currentUser = await CHECK_AUTH();
  if (!currentUser) return "User not logged in";

  const response = await axios({
    method: "POST",
    url: `/api/post/dislike/${postId}`,
    withCredentials: true,
    data: {
      userId: currentUser._id,
    },
  });

  if (response.status === 200) {
    return response;
  }
};

export const IMAGE_GENERATOR_V3 = async (promptv3) => {
  const currentUser = await CHECK_AUTH();

  const { prompt, negativePrompt, size, style } = promptv3;
  if (!prompt || !negativePrompt || !size || !style) return "Prompt is missing";

  const lowerCaseStyle = style.toLowerCase();

  const AIImage = await OpenAi.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    negative_prompt: negativePrompt,
    size: size,
    n: 1,
    quality: "hd",
    style: lowerCaseStyle,
  });

  if (AIImage.data[0].url) {
    const response = await axios({
      method: "POST",
      url: `/api/post/create/v3/${currentUser._id}`,
      withCredentials: true,
      data: {
        prompt: prompt,
        negativePrompt: negativePrompt,
        reversePrompt: AIImage.data[0].revised_prompt,
        size: size,
        style: lowerCaseStyle,
        n: 1,
        imageURL: AIImage.data[0].url,
      },
    });

    if (response.status === 201) {
      const response = await axios({
        method: "PUT",
        url: `/api/post/credit/${currentUser._id}`,
        withCredentials: true,
        data: {
          credit: Number(response.data.credit) - 1,
        },
      });
      return response;
    }
  }
};

export const IMAGE_GENERATOR_V2 = async (promptv2) => {
  const currentUser = await CHECK_AUTH();

  const { prompt, negativePrompt, size, n } = promptv2;
  if (!prompt || !negativePrompt || !size || !n) return "Prompt is missing";

  // const lowerCaseStyle = style.toLowerCase();

  const AIImage = await OpenAi.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    size: size,
    n: Number(n),
  });

  const imageUrls = extractImageUrls(AIImage.data);

  if (imageUrls.length > 0) {
    const response = await axios({
      method: "POST",
      url: `/api/post/create/v2/${currentUser._id}`,
      withCredentials: true,
      data: {
        prompt: prompt,
        negativePrompt: negativePrompt,
        size: size,
        n: Number(n),
        imageURL: imageUrls,
      },
    });

    if (response.status === 201) {
      const response = await axios({
        method: "PUT",
        url: `/api/post/credit/${currentUser._id}`,
        withCredentials: true,
        data: {
          credit: Number(response.data.credit) - 1,
        },
      });
      return response;
    }
  }
};

export const GET_AI_iMAGE = async () => {
  const response = await axios({
    method: "GET",
    url: `/api/post/all`,
    withCredentials: true,
  });

  if (response.status === 200) {
    return response.data.post;
  }
};

export const GET_USER_AI_iMAGE = async (userId) => {
  const response = await axios({
    method: "GET",
    url: `/api/post/user/${userId}`,
  });

  if (response.status === 200) {
    return response.data.post;
  }
};

export const GET_SINGLE_POST = async (postId) => {
  const response = await axios({
    method: "GET",
    url: `/api/post/single/${postId}`,
  });

  if (response.status === 200) {
    return response.data.post;
  }
};

export const DELETE_POST = async (postId) => {
  const response = await axios({
    method: "DELETE",
    url: `/api/post/delete/${postId}`,
    withCredentials: true,
  });

  if (response.status === 200) {
    return response;
  }
};

export const BUY_CREDIT = async (credit) => {
  const currentUser = await CHECK_AUTH();

  const response = await axios({
    method: "PUT",
    url: `/api/post/credit/${currentUser._id}`,
    withCredentials: true,
    data: {
      credit: Number(currentUser.credit) + Number(credit),
    },
  });

  if (response.status === 200) {
    return response;
  }
};
