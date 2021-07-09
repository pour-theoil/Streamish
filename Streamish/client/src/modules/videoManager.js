const baseUrl = '/api/video';

export const getAllVideos = () => {
  return fetch(`${baseUrl}/GetWithComments/`)
    .then((res) => res.json())
};

export const addVideo = (video) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(video),
  });
};

export const searchVideo = (criteria, order) => {
  return fetch(`${baseUrl}/Search?q=${criteria}&sortDesc=${order}`)
  .then((res)=> res.json())
};

export const getVideo = (id) => {
  return fetch(`${baseUrl}/${id}`).then((res) => res.json());
};