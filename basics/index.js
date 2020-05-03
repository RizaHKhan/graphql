import { GraphQLServer } from "graphql-yoga";

// Scalar Types:
// String
// Boolean
// Int (whole numbers)
// Float (numbers w/ decimal points)
// ID

// Demo User Data
const users = [
  {
    id: "1",
    name: "khanr",
    email: "email@example.com",
    age: 34,
  },
  {
    id: "2",
    name: "sarah",
    email: "sarah@example.com",
    age: 18,
  },
  {
    id: "3",
    name: "liz",
    email: "liz@example.com",
    age: 50,
  },
];

const posts = [
  {
    id: "1",
    title: "Post 1",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur delectus cum commodi dignissimos voluptate dolorem porro sed deserunt debitis praesentium!",
    published: true,
    author: "1",
  },
  {
    id: "2",
    title: "Post 2",
    body:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto totam ab similique voluptate hic voluptatibus quia consequuntur sequi delectus pariatur.",
    published: false,
    author: "2",
  },
  {
    id: "3",
    title: "Post 3",
    body:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta labore consequatur voluptates saepe tempore. Perferendis labore dolorem sapiente aperiam ad?",
    published: false,
    author: "3",
  },
];

const comments = [
  {
    id: "1",
    text: "This is a commmer about post 1",
  },
  {
    id: "2",
    text: "This is a commmer about post 2",
  },
  {
    id: "3",
    text: "This is a commmer about post 3",
  },
  {
    id: "2",
    text: "This is a commmer about post 2 as well",
  },
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comment: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((item) => {
        const titleMatch = item.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const bodyMatch = item.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return titleMatch || bodyMatch;
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
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
    comment() {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
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
