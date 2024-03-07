import axios from "axios";

const end_point = 'http://localhost:8001/api'

const signIn = async (user) => {
    try {
        const response = await axios.post(
            `${end_point}/user/login`,
            user
        )
        return response.data.token;

    } catch (error) {
        console.log(error);
    }
}
// const signUp = async (email, password) => {
//     const response = await axios.post(
//         `${end_point}/user/login`,
//         {
//             email,
//             password
//         }
//     )
//     console.log(response);
// }

export default signIn