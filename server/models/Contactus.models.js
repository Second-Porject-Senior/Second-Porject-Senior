module.exports = (sequelize, DataTypes) => {
    const contact = sequelize.define(
        'contact',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        },
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        },
        {
            phonenumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            }
        },
        {
            adress : {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        },
        {
            message : {
                type: DataTypes.Text,
                allowNull: false,
                unique: true,
            }
        },
       
    );

    return contact;
};
