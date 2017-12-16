const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const mysql2 = require('mysql2');


//create sequelize instance with local database
const sequelize = new Sequelize('mysql://root:glpMySQL2017@localhost:3306/chores_db');

// setup User model and its fields.
const user = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    loginname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    pswd: {
        type: Sequelize.STRING,
        allowNull: false
    },

    rewardpts: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    adminflag: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.pswd = bcrypt.hashSync(user.pswd, salt);
        }
    }
})

user.prototype.validPassword = function(pswd) {
        return bcrypt.compareSync(pswd, this.pswd);
    }
    // create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = user;