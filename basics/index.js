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
    greeting(name: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
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
    grades(parent, args, ctx, info) {
      return [12, 123, 14, 15]
    },
    add(parent, args, ctx, info) {
      if (!args.numbers.length) {
        return 0
      }

      return args.numbers.reduce((a, b) => {
        return a + b
      })
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello ${args.name}`;
      } else {
        return "Hello guest!"
      }
    },
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
