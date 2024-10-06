const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
            console.log(`decode value: ${decode.id}`)
            if ((err)) {
                return res.status(401).send({
                    success: false,
                    message: 'Unauthorized user.'
                })
            } else {
                req.body.id = decode.id;
                next();
            }
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: `Please provide auth token.`,
            "statusCode": res.statusCode,
            error
        })
    }
}