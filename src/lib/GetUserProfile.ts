import { User, UserJSON } from "../../interface";

export default async function GetUserProfile(uid: string) {
    const response = await fetch (`/Storage/User/user.json`, {
        method: "GET",
        body: JSON.stringify(uid)
    });
    if (!response.ok) {
        throw new Error("Cannot get user profile");
    }
    const userJson: UserJSON = await response.json();
    const user: User | undefined = userJson.data.find(u => u.id === uid);
    if (!user) {
        throw new Error("No user");
    }
    return user;
}