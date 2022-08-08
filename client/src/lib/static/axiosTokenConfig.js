const token = JSON.parse(localStorage.getItem("tsToken"));

const axiosTokenConfig = {
  headers: {
    "Content-Type": "application/JSON",
    authorization: `Bearer ${token}`,
  },
};

export default axiosTokenConfig;
