'use strict'

const Todo = (sequelize, DataTypes) => {
    const todoModule = sequelize.define('todo', {
        item: { type: DataTypes.STRING, allowNull: false, unique: true },
        Assigned: { type: DataTypes.STRING, allowNull: false },
        Difficulty: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

    })

    return todoModule
}
module.exports = Todo