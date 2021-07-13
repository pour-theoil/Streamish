import { getToken } from "./authManager";

const baseUrl = '/api/video';

export const getAllVideos = () => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/GetWithComments/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get quotes.");
      }
    });
  });
};

export const addVideo = (video) => {
  return getToken().then((token) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(video),
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a new quote.");
      }
    });
  });
};

export const searchVideo = (criteria, order) => {
  return getToken().then((token) => {

    return fetch(`${baseUrl}/Search?q=${criteria}&sortDesc=${order}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get quotes.");
      }
    });
  });
};

export const getVideo = (id) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get quotes.");
      }
    });
  });
};

export const uploadvideo = (file) => {
  return getToken().then((token) => {
    return fetch(`${baseUrl}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    }).then(resp => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("An unknown error occurred while trying to save a new quote.");
      }
    });
  });
};