import jwt from "jsonwebtoken";

function validadorCookies(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ mensagem: "Não autorizado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).send({ mensagem: "Não autorizado" });
  }
}

export default validadorCookies;
