const { INTEGER, STRING, DATE } = require ('sequelize')
const { connection } = require('../database/connection')

const Usuario = connection.define("usuario", {
    id: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        },

    name: {
        type: STRING,
        allowNull: false,
        },
    
    email: {
        type: STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },

    password:{
        type: STRING,
        allowNull: false,
        validate: {
            len: {args: [8, 15], msg: "Senha precisa ter entre 8 a 15 char."},
            strongPassword(value) {
                if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
                    throw new Error('Senha deve conter pelo menos 1 letra maiúscula e 1 número.');
                }
            }
        },
    },

    createdAt: {
        type: DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DATE,
        allowNull: false,
      },
},

{  underscored: true, paranoide: true })

module.exports = { Usuario }