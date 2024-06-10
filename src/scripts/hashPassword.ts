const bcrypt = require('bcrypt');

const saltRounds = 10;
const plainPassword = '12345678';

bcrypt.hash(plainPassword, saltRounds, (err: any, hash: any) => {
  if (err) throw err;
  console.log(hash);
});
//npx ts-node src/scripts/hashPassword.ts