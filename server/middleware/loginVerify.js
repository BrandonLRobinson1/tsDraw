const Yup = require("yup");

const loginVerify = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string()
        .required()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ error: "Verifique os campos acima." });
  }
};

module.exports = loginVerify;
