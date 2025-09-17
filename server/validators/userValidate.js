import yup, { Schema } from "yup";

export const userSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be atleast of 3 character")
    .max(10, "Username must me at max 10 character")
    .required(),
  email: yup.string().email("The email is not valid one").required(),
  password: yup
    .string()
    .min(4, "Password must be atleast 4 character")
    .max(10, "Password at max be 10 character")
    .required(),
});

export const validateUser = (schema)=> async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
} 
