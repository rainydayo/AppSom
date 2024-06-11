import { User } from "../../interface";
import GetDataFromJson from "./GetDataFromJson";

export default async function Register(user: User) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  console.log(JSON.stringify(user));

  if (response.ok) {
    alert("User added to JSON file");
    console.log(user);
  } else {
    const errorData = await response.json();
    alert(`Failed to add user to JSON file: ${errorData.message}`);
  }

  return response;
}
