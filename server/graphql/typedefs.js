const typeDefs = `#graphql
scalar Date
# Graphql types
# scalar date ID, String uuiv4, _id
# CREATE INDEX
type Task {
  taskId: ID! 
  title: String!
  board: ID
  dateCreated: Date
  dateModified: Date
  dueDate: Date
  assignedTo: ID
}

type Board {
  boardId: ID!
  title: String!
  description: String
  dateCreated: Date
  tasks: [Task]
}

# POST - Creating Tasks
input TaskBody {
  taskId: ID!
  title: String!
  board: String!
  dueDtate: Date
  assignedTo: ID  
}
input BoardBody {
  boardId: ID!
  title: String!
  description: String
  dateCreated: Date
  # tasks: [Task]
}

type Query {
  # tasks
  allTasks: [Task!]!
  getTask(taskId: ID!): Task!
  # boards
  allBoards: [Board!]!
  getBoard(boardId: ID!): Board!

}

type Mutation {
  # tasks
  createTask(task: TaskBody): Task!
  deleteTask(taskId: ID!): Boolean
  editTask(title: String!, board: String!, taskId: ID!): Boolean
  # boards
  createBoard(board: BoardBody): Board!
  deleteBoard(boardId: ID!): Boolean


}
`;
export default typeDefs;
