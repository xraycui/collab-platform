import { Types } from 'mongoose'
import { Board } from "../mongo/models/Board"


async function addBoard() {
  
}

async function getBoards(userId: string) {
  return await Board.find(({
    $or: [{ ownerId: userId }, { members: userId }]
  })).sort({ updateAt: -1})
}

async function addBoardMembers(boardId: string, userId: string) {
  
}

const boardServcie = {
  addBoard,
  getBoards,
  addBoardMembers
}

export default boardServcie