export default class ResponseFactory {
  responseOk(res, data = {}) {
    return res.status(200).json({ data });
  }

  responseNotFound(res, data = {}) {
    return res.status(404).json({ data });
  }
}
