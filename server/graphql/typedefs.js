const typeDefs = `#graphql
scalar Date

type Task {
  title: String!
  board: String!
  dateCreated: Date
  dateModified: Date
  dueDate: Date
  assignedTo: ID
}

# POST - Creating Tasks
input TaskBody {
  title: String!
  board: String!
  dueDtate: Date
  assignedTo: ID  
}

type Query {
  allTasks: [Task!]!
  getTask(ID: ID!): Task!
  getTaskTitle(title: String!): Task
}

type Mutation {
  createTask(task: TaskBody): Task
  deleteTask(ID: ID!): Boolean
  editTask(title: String!, board: String!, ID: ID!): Boolean
}
`;
export default typeDefs;
