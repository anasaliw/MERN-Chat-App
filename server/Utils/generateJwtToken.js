import jwt from "jsonwebtoken";
export const generateJwtToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });
  return token;
};
