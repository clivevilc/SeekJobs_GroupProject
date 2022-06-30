// middleware to check if the user is logged in

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.cookies);
        
    }
}