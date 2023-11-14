import jwt from 'jsonwebtoken'
import User from '../model/user.js'

/**
 * @DESC Verify JWT from authorization header Middleware
 */
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        res.status(401).json({ message: 'Unauthorized' })
    } else {
        const token = authHeader.split(' ')[1]
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (decoded) {
                    const { userId } = decoded
                    const user = await User.findById(userId)
                    req.session.user = user
                    if (err) {
                        res.status(401).json({ message: 'Unauthorized' })
                    }
                    next()
                } else {
                    res.status(401).json({ message: 'Unauthorized' })
                }
            })
        } else {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}

export { authenticateUser }
