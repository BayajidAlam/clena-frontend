import jwtDecode from "jwt-decode";

export const decodedToken = (token:string):any => {
    return jwtDecode(token)
}