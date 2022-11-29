import { PERMISSIONS } from "../constants";

export const FindPermission = (permission) => {
    const permissions = localStorage.getItem(PERMISSIONS);
    // permissions can be null cuse not locally stored yet. 
    if(permissions){
        const permissionsSplit = permissions.split(",");
        return permissionsSplit.find(element => element === permission)
    }   
    return null;
}