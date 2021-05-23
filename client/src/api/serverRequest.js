import axios from "axios";
// const baseUrl = "https://oninecoponsapp.herokuapp.com/api";// live url
export const serverImageUrl = 'http://127.0.0.1:8000/images'
// export const serverImageUrl = 'https://oninecoponsapp.herokuapp.com/images'
// export const serverUrl = 'https://oninecoponsapp.herokuapp.com'
const serverUrl = "http://127.0.0.1:8000";
export const baseUrl = `${serverUrl}/api`;

export const get = async (url) => {
  try {
    let response = await axios.get(baseUrl + url, {});
    return response;
  } catch (error) {
    return error;
  }
};
export const post = async (url, data,) => {
  try {
    let response = await axios.post(baseUrl + url, data);
    return response;
  } catch (error) {
    return error;
  }
};
