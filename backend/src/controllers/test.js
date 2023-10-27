function getHelloMessage(req, res) {
    return res.send({ message: "Hello, this is a test function!" });
}

module.exports = {
    getHelloMessage,
};
