const typeDefs = `#graphql
scalar Date

type Task {
  _id: ID!
  title: String!
  description: String
  dateCreated: Date
  dueDate: String
  boardId: ID
  isComplete: Boolean
  order: Int
}

type Board {
  _id: ID!
  title: String!
  description: String
  dateCreated: Date
  dueDate: String
  order: Int
}

# POST - Creating Tasks
input TaskBody {
  title: String!
  boardId: ID
  description: String
  dueDate: String
  order: Int
  # assignedTo: ID  
}

input BoardBody {
  title: String!
  description: String
  dateCreated: Date
}

type Query {
  getAllTasks: [Task!]!
  getTask(taskId: ID!): Task
  getAllBoards: [Board!]!
  getBoard(_id: ID!): Board
}

type Mutation {
  # Task mutations
  createTask(title: String!, description: String, dueDate: String, boardId: ID, isComplete: Boolean): Task!
  updateTask(_id: ID!, title: String, description: String, dueDate: String, boardId: ID, isComplete: Boolean): Task!
  deleteTask(_id: ID!): Task
  reorderTask(taskId: ID!, sourceBoardId: ID!, destinationBoardId: ID!,sourceIndex: Int!  destinationIndex: Int!): Task!
  
  # Board mutations
  createBoard(title: String!, description: String, dueDate: String): Board!
  updateBoard(_id: ID!, title: String, description: String, dueDate: String): Board!
  reorderBoard(boardId: ID!, sourceIndex: Int!, destinationIndex: Int!): Board!
  deleteBoard(_id: ID!): Board
}
`;
export default typeDefs;
