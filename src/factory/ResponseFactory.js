export default class ResponseFactory {
  responseOk(res, data = { message: "OK" }) {
    return res.status(200).json({ data });
  }

  responseNotFound(res, data = { message: "Not Found" }) {
    return res.status(404).json({ data });
  }
}
