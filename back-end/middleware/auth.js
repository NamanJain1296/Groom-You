var webtoken = require('jsonwebtoken');

exports.jawth = (req, res, next) => {
    const token = req.headers['authorization']; 

    if (!token) {
        res.json({ status: false, message: 'Authorization header is missing' });
        return;
    }

    var ary = token.split(" ");
    try {
        const isValid = webtoken.verify(ary[1], process.env.sec_key);

        if (isValid) {
            const dtoken = webtoken.decode(ary[1], process.env.sec_key);
            req.email = dtoken.email;
            next();
        } else {
            res.json({ status: false, message: 'Invalid Token' });
            return;
        }
    } catch (error) {
        res.json({ status: false, message: 'Error verifying token' });
    }
};
