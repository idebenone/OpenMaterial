import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    pfp: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public pfp!: string;
}

User.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    pfp: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: true
})

export { User, UserAttributes, UserCreationAttributes };
