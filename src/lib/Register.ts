
export default async function Register(formData: FormData) {
  const imageFile = formData.get('image') as File;
  let imageUrl = '';

  if (imageFile) {
    const imageResponse = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      imageUrl = imageData.imageUrl;
    } else {
      const errorData = await imageResponse.json();
      alert(`Failed to upload image: ${errorData.message}`);
      return imageResponse;
    }
  }

  formData.set('image', imageUrl);

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });

  if (response.ok) {
    alert("User added to JSON file");
  } else {
    const errorData = await response.json();
    alert(`Failed to add user to JSON file: ${errorData.message}`);
  }

  return response;
}
