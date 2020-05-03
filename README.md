# GRAPHQL

### Lecture 10:

Covered basics of exporting/importing functions between files.
There can only be one defaul export which can be named anything in the receiving file

### Lecture 11:
Setup a GraphQL server and query

### Lecture 12:
Reviewing the five scalar values GraphQL accepts

### Lecture 13:
Automatic server restarts using nodemon
Adjusted package.json accordingly

### Lecture 13:
Query in GraphQL
```
query {
  me {
    id
    name
    email
    age
  }
}
```
### Lecture 15:
A query can receive an argument(s)
A query resolver has 4 arguments, and the `args` object receives all of the query arguments

### Lecture 16:
Sending arrays to the server

### Lecture 17:
Passing a argument to the users array and applying a search filter

### Lecture 18:
Setting up relationships between data.
If we add a custom data type, we must tell graphql how to get that information
Setup relationship between User and Posts

### Lecture 19:
Established a relationship both ways