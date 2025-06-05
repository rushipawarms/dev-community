const adminAuth = (req, res, next) => {
    const token = 'xyz';
    //const token = 'xyz1'
    const isAdmin = token === 'xyz';
    if (isAdmin) {
        next()
    }
    else {
        res.status(401).send("Unauthorized request")
    }
}

module.exports = {
    adminAuth
}