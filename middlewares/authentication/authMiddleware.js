const jwt = require('jsonwebtoken')

// TODO : Authentication Middleware
class authMiddleware {
    static authenticaToken = async(req, res, next) => {
        // * mengambil header Authorization dari request
        const authHeader = req.headers['authorization']

        // * memisahkan header untuk mendapatkan token (Bearer token)
        const token = authHeader && authHeader.split(' ')[1]

        // * validasi token
        if (!token) {
            // * response failed - jika tidak ada token maka 'No token provided'
            const error = new Error('No token provided')
            error.status = 401
            return next(error)
        }
        try {
            // * verifikasi token dengan JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // * save ke dalam objek request
            req.user = decoded
            next();
        } catch (error) {
            //  * log bila ada kesalahan verifikasi token
            console.error('JWT Verification Error:', error.message);
            // * error helpers status code = 401
            error.status = 401
            // * error message renewal error.message => 'Invalid Token'
            error.message = 'Invalid token'
            // * middleware error helpers
            return next(error)
        }
    }

// TODO : Authorization Roles
    static authorizeRoles = (...allowedRoles) => {
        // * return middleware untuk bagian role
        return (req, res, next) => {
            // * variabel user => user dan role tidak ditemukan
            const user = !req.user || !req.user.role
            if (user) { 
               // * response failed - jika tidak ada role maka 'No role found'
               const error = new Error('Access denied: No user and role found')
               // * error helpers status code = 403
               error.status = 403
                 // * middleware error helpers
               return next(error)
            }

            // * variabel roles => role tidak sesuai
            const roles = !allowedRoles.includes(req.user.role)
            if (roles) {
                 // * response failed - jika tidak ada role maka 'No role found / match'
               const error = new Error('Access denied: Role not match')
               // * error helpers status code = 403
               error.status = 403
                 // * middleware error helpers
               return next(error)
            }
            // * lanjut ke middleware berikutnya
            next();
        }
    }
}
module.exports = authMiddleware