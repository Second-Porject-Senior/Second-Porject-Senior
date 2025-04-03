module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("customer", "admin"),
            defaultValue: "customer",
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        pfp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, { timestamps: true });

    return User;
};
