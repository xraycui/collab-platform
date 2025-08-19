import db from '../db/connection'

async function addUser () {

}

async function updateUser () {

}

async function deleteUser () {

}

async function getUser (id: string) {
  return await db('users')
    .select('id', 'email', 'created_at', 'updated_at')
    .where({id})
    .first()
}

const userService = {
  addUser,
  updateUser,
  getUser,
  deleteUser
}

export default userService 