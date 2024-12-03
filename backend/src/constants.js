const cookieOptions = {
    httpOnly : true, //accessible only by webrequest
    secure : true, //https
    sameSite : 'None', //allows cross site cookies
    maxAge : 7 * 24 * 60 * 60 *1000 //max age of expiry of cookies
}

export {cookieOptions}