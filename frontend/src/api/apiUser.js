import axios from "axios";

const apiUser = axios.create({
    baseURL: "https://themoviedb1108.herokuapp.com/",
    // baseURL: "http://localhost:5000"
});

const addJwt = (jwt) => {
    apiUser.interceptors.request.use((config) => {
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${jwt}`,
            },
        };
    });
};

export { addJwt };

export default apiUser;
