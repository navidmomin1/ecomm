const { gql } = require("apollo-server");

const typeDefs = gql`
  type Products {
    name: String
    desc: String
  }
  type Query {
    products: [Products]
  }
`;

module.exports = typeDefs;
