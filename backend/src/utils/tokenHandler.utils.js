import jwt from 'jsonwebtoken'

const generateAccessToken = function (id) {
    const token = jwt.sign({_id : id},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
    return token;
}

const generateRefreshToken = function (id) {
    const token = jwt.sign({_id : id},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
    return token;
}

const decodeAccessToken = function (token) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return decoded;
}

const decodeRefreshToken = function (token) {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    return decoded;
}

export {generateAccessToken, generateRefreshToken, decodeAccessToken, decodeRefreshToken}