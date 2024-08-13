const bycrpt = require('bcrypt')
const {v4 : uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const helpers = require('../helpers/helpers.js')
const JWT_SECRET = process.env.JWT_SECRET;

class authController {
  // TODO Method register
  static register = async (req, res, next) => {
    // * mendapatkan request body dari user
    const { username, email, password, role } = req.body
    const allowedRoles = ['customer', 'member']
    try {
      // * validasi apakah role yang digunakan sesuai
      if (!allowedRoles.includes(role)){  
        const error = new Error('roles not valid')
        error.code = 400
        throw error
      }

      // * mendapatkan data user berdasarkan email dengan model user
      const existingEmail = await userModel.getUserByEmail(email)
      console.log("🚀 ~ authController ~ register= ~ existingEmail:", existingEmail)
      // * valuidasi apakah email tersedia atau tidak
      if (existingEmail){
        // * response failed - jika email sudah ada 'Email already exists'
        const error = new Error('Email already exists')
        error.code = 400
        throw error
      }

      // * mendapatkan data user berdasarkan role dengan model user
      const roleName = await userModel.getRoleByName(role)
      console.log("🚀 ~ authController ~ register= ~ roleName:", roleName)
      // * validasi role
      if (!roleName) {
        // * response failed - jika role tidak valid 'Invalid role'
        const error = new Error('Invalid role')
        error.code = 400
        throw error
      }

      // * mendapatkan id dari table tole dari => roleName
      const roleId = roleName.id;
      console.log("🚀 ~ authController ~ register= ~ roleId:", roleId)
      // * Hashing password menggunakan bcrypt dengan salt 10
      const hashedPassword = await bycrpt.hash(password, 10)
      // * membuat data user baru (register user)
      const newUser = await userModel.createUser({
        username,
        email,
        password: hashedPassword,
        roleId,
      })

      const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" })
      return res.status(201).json(helpers.responBody('Success', { data: newUser, token: token }))
    } catch (error) {
      console.error(error);
      next(error)
    }
  }

  // TODO Method login
  static login = async(req, res, next) => {
     // * mendapatkan request body dari user
    const { email, password } = req.body;
    try {
      // * mendapatkan data user berdasarkan email dari model user
      const user = await userModel.getUserRoleByemail(email)
        console.log("🚀 ~ authController ~ login=async ~ user:", user)
        // * validasi user
      if(!user){
          // * response failed - jika user berdasarkan email tidak valid 'Invalid credential'
        const error = new Error('Invalid credentials')
        error.code = 400
        throw error
      }

      // * validasi match jika user tidak sesuai requirement diatas dan tidak sesuai dengan password user
      const match = !user || !(await bycrpt.compare(password, user.password))
      if (match) {
         const error = new Error('Invalid credentials')
         error.code = 400
         throw error
    }
      const token = jwt.sign({id: user.userId, username: user.username, role: user.role}, JWT_SECRET, { expiresIn: '1h' });
      console.log(" token:", token)
      
      // * save user di session
      req.session.user = {id : user.userId, username: user.username, role: user.role}

      return res.status(200).json(helpers.responBody('Success', { data: req.session.user, token: token }))
    } catch (error) {
      console.error(error)
      next(error)
    }
  }

  // TODO : method logout
  static logout = (req, res) => {
    try {
      req.session.destroy((err)=>{
        if(err) {
          const error = new Error('Logout failed')
          error.code = 500
          throw error
        }
        res.status(200).json(helpers.responBody('Success', 'Logged out successfully'))
      })
    }catch (error) {
      next(error)
    }
  }
  
}

module.exports = authController
