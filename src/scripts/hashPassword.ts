import bcrypt from 'bcrypt';

const saltRounds = 10;
const plainPassword = 'your_password_here';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log(hash); // Store this hash in your JSON file
});
