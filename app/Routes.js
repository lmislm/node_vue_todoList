'use strict'

var express = require('express')

var todoRoutes = express.Router()

var Todo = require('./Todo')

// 获取 所有 todo items in the 数据库

todoRoutes.route('/all').get(function (req, res, next) {
    Todo.find(function (err, todos) {
        if (err) {
            return next(new Error(err))
        }

        res.json(todos) // 返回 所有 todos
    })
})

// 添加一个 todo item
todoRoutes.route('/add').post(function (req, res) {
    Todo.create({
            name: req.body.name,
            done: false
        },
        function (error, todo) {
            if (error) {
                res.status(400).send('不能创建todo菜单')
            }
            res.status(200).json(todo)
        }
    )
})

// delete a todo item

todoRoutes.route('/delete/:id').get(function (req, res, next) {
    var id = req.params.id
    Todo.findByIdAndRemove(id, function (err, todo) {
        if (err) {
            return next(new Error('Todo没找到啊'))
        }
        res.json('成功移除')
    })
})

// update a todo item

todoRoutes.route('/update/:id').post(function (req, res, next) {
    var id = req.params.id
    Todo.findById(id, function (error, todo) {
        if (error) {
            return next(new Error('Todo没找到啊'))
        } else {
            todo.name = req.body.name
            todo.done = req.body.done

            todo.save({
                function (error, todo) {
                    if (error) {
                        res.status(400).send('更新todo失败')
                    } else {
                        res.status(200).json(todo)
                    }
                }
            })
        }
    })
})

module.exports = todoRoutes
