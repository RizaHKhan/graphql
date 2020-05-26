import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";
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
    comments: "1",
  },
  {
    id: "2",
    title: "Post 2",
    body:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto totam ab similique voluptate hic voluptatibus quia consequuntur sequi delectus pariatur.",
    published: false,
    author: "2",
    comment: "2",
  },
  {
    id: "3",
    title: "Post 3",
    body:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta labore consequatur voluptates saepe tempore. Perferendis labore dolorem sapiente aperiam ad?",
    published: false,
    author: "3",
    comment: "3",
  },
];

const comments = [
  {
    id: "1",
    text: "This is a commmer about post 1",
    author: "1",
    post: "1",
  },
  {
    id: "2",
    text: "This is a commmer about post 2",
    author: "2",
    post: "2",
  },
  {
    id: "3",
    text: "This is a commmer about post 3",
    author: "3",
    post: "3",
  },
  {
    id: "2",
    text: "This is a commmer about post 2 as well",
    author: "1",
    post: "2",
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

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.email);
      if (emailTaken) {
        throw new Error("Email already exists in database");
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
      console.log(args);
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        console.log(comment.post);
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
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
