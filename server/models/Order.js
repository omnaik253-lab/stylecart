const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false
    },

    state: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },

    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },

    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    }
});

module.exports = Order;