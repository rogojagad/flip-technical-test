"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ResponseFactory {
  responseBadRequest(res, data = {
    message: "Bad Request, Parameter Not Complete"
  }) {
    return res.status(400).json({
      data
    });
  }

  responseCreated(res, data = {
    message: "Created"
  }) {
    return res.status(200).json({
      data
    });
  }

  responseOk(res, data = {
    message: "OK"
  }) {
    return res.status(200).json({
      data
    });
  }

  responseNotFound(res, data = {
    message: "Not Found"
  }) {
    return res.status(404).json({
      data
    });
  }

  responseUnauthorized(res, data = {
    message: "Unathorized"
  }) {
    return res.status(401).json({
      data
    });
  }

}

exports.default = ResponseFactory;
//# sourceMappingURL=ResponseFactory.js.map