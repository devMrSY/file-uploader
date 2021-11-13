import axios from 'axios'

const baseURL = "http://13.234.19.54:9000/api"

export const fetchData = async (token) => {
  let config = {
    headers: {
      Authorization: token,
    }
  }

  try {
    const { data } = await axios.get(`${baseURL}/users`, config);
    return data
  } catch (error) {
    return error;
  }
};

export const adminAuthentication = async (state) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, {
      email: state.email,
      password: state.password
    })
    return (response.data)
  } catch (error) {
    return error.response;
  }
}

export const RegistrationUser = async (personDetails) => {
  try {
    const response = await axios.post(`${baseURL}/users/registration`, {
      email: personDetails.email,
      firstName: personDetails.firstName,
      lastName: personDetails.lastName,
      phone: personDetails.phone,
      password: personDetails.password
    })
    return (response)
  } catch (error) {
    return error.response;
  }
}