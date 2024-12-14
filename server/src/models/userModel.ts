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
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public pfp!: string;

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
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: true
})

User.hasMany(Token, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'token'
});

User.hasOne(Session, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'session'
})

export { User, UserAttributes, UserCreationAttributes };
