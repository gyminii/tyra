const typeDefs = `#graphql
scalar Date

type Task {
  _id: ID!
  title: String!
  description: String
  dateCreated: String
  dueDate: String
  boardId: ID
  isComplete: Boolean
}

type Board {
  _id: ID!
  title: String!
  description: String
  dateCreated: String
  dueDate: String
  tasks: [Task]!
}

# POST - Creating Tasks
input TaskBody {
  title: String!
  boardId: ID
  description: String
  dueDate: Date
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

  # Board mutations
  createBoard(title: String!, description: String, dueDate: String): Board!
  updateBoard(_id: ID!, title: String, description: String, dueDate: String): Board!
  deleteBoard(_id: ID!): Board
}
`;
export default typeDefs;
