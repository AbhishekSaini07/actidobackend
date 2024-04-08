

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        imageUrl: {
            type: DataTypes.STRING
        },
       
        userDescription: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "user",
        createdAt: "createdAt", // This renames the createdAt field to postTime
      updatedAt: false,
        // Define hooks or methods for handling expiration logic if needed
    });

    // Define a method or hook for handling expiration logic if needed

    return User;
}
