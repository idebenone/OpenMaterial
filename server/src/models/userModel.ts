import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { Token } from "./tokenModel";
import { randomUUID } from "crypto";
import { Session } from "./sessionModel";

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    pfp: string;
    gh_username: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'gh_username'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public pfp!: string;
    public gh_username!: string;

    public token!: Token[];
    public session!: Session;
}

User.init({
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => randomUUID(),
        primaryKey: true,
        unique: true
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
        allowNull: true
    },
    gh_username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: true
})

export { User, UserAttributes, UserCreationAttributes };
