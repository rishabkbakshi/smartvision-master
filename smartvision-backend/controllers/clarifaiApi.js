const Clarifai =  require('clarifai');

const clarifaiApp = new Clarifai.App({
    apiKey: "464257a5fadf47c888c1e42758e86b2a"
});

const faceDetectHandler = (req, res) => {
    console.log(req.body);
    clarifaiApp.models
        .predict(
            "a403429f2ddf4b49b307e318f00e528b",
            req.body.input)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
}

module.exports = {
    faceDetectHandler: faceDetectHandler
}