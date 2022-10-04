export const makeID = (length: number) => {
  let result = '';

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  characters.split('').forEach((char, index) => {
    if (index < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  });

  return result;

}
