export default function CheckOwner (owner : string, user : string) {
    if (owner != user) {
        return false;
    }
    return true;
}