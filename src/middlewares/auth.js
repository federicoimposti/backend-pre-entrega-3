const auth = (req, res, next ) => {
    const admin = true;
    res.admin = admin;
    next();
}

export default auth;