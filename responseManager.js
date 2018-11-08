module.exports.CreateResponse = (code, body) => {
    var response = {
      statusCode: code,
      body: JSON.stringify(body)
    }
    return response;
};