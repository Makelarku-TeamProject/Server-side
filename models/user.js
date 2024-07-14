const knex = require("../config/config")

// TODO : Model user
class userModel {
  // TODO : create user
  static createUser = async (userdata) => {
    try {
      // * menggunakan `const [user]` => untuk mengembalikan menjadi 1 array
      /*[{
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'securepassword',
            created_at: '2024-06-24T12:00:00.000Z',
            updated_at: '2024-06-24T12:00:00.000Z'
        }]*/
      const [user] = await knex("users").insert(userdata).returning("*")
      return user
    } catch (error) {
        throw new Error(error.message)
    }
  }

  // TODO : getUserByEmail => mendapatkan user berdasarkan email
  static getUserByEmail = async (email) => {
    try {
        return await knex("users").where({ email }).first()
    } catch (error) {
        throw new Error(error.message)
    }
    
  }

  // TODO : getRoleByName => mendapatkan role berdasarkan nama rolenya
  static getRoleByName = async (roleName) => {
    try {
        return await knex("roles").where({ name: roleName }).first()
    } catch (error) {
        throw new Error(error.message)
    }
  }

  // TODO : getUserRoleByemail => mendapatkan user beserta role berdasarkan email
  static getUserRoleByemail = async (email) => {
    try {
        return await knex("users")
        .join("roles", "users.roleId", "=", "roles.id")
        .where("users.email", email)
        .select("users.id as userId", "users.username", "users.password", "roles.name as role", "roles.id as rolesId")
        .first()
    } catch (error) {
        throw new Error(error.message)
    }
   
  }

  // TODO : Truncate user => menghapus data semua user berkaitan
  static truncateUsers = async () => {
    try {
        // ! truncate data users dengan raw sql
        return knex.raw("TRUNCATE TABLE users CASCADE")
    } catch (error) {
        throw new Error(error.message)
    }
    
  }
}

module.exports = userModel
