const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  metaEn: {
    name: String,
    description: String
  },
  metaFr: {
    name: String,
    description: String
  },
  metaEs: {
    name: String,
    description: String
  },
  metaCa: {
    name: String,
    description: String
  },
  metaDe: {
    name: String,
    description: String
  },
  price: String,
  quantity: String,
  buyNew: Boolean,
  link: String,
  booked: Boolean,
  userId: String,
  userName: String,
  userEmail: String,
  userComment: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
