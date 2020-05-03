import { GraphQLServer } from "graphql-yoga";

// Scalar Types:
// String
// Boolean
// Int (whole numbers)
// Float (numbers w/ decimal points)
// ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    users: [User!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "123456",
        name: "khanr",
        email: "khanr@gmail.com",
        age: 34,
      };
    },
    post() {
      return {
        id: "abc",
        title: "Post title",
        body: "This is post body",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up on localhost 4000");
});
