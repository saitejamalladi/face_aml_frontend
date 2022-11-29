import axios from "../utils/axios";
import { PERMISSIONS } from "../constants";

const translatePermissions = (permissionArray) => {
    let translatedPermissionArray = [];
    permissionArray.forEach(element => translatedPermissionArray.push(element.permission));
    localStorage.setItem(PERMISSIONS, translatedPermissionArray);
    return translatedPermissionArray;
};

export function fetchPermissions(token) {
    return new Promise((resolve, reject) => {
      let authHeader = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get("/api/user/permissions", authHeader)
        .then((response) => {
          if (response.status === 200) {
            const permissions = translatePermissions(response.data.res_data);
            resolve(permissions);
          }
          reject(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
}

