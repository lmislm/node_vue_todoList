var mongoose = require('mongoose')

// 定义 collection and schema for todo Item

var todo = new mongoose.Schema({
        name: {
            type: String
        },

        done: {
            type: Boolean
        }
    },

    {
        collection: 'todos'
    }
)

module.exports = mongoose.model('Todo', todo);