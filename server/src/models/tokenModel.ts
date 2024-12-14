import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { User } from "./userModel";
import { randomUUID } from "crypto";

interface TokenAttributes {
    id: string;
    user_id: string;
    token_name: string;
    access_token: string;
    refresh_token: string;
    access_expires_in: number;
    refresh_expires_in: number;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> { }

class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public id!: string;
    public user_id!: string;
    public token_name!: string;
    public access_token!: string;
    public refresh_token!: string;
    public access_expires_in!: number;
    public refresh_expires_in!: number;

    public user!: User;
}

Token.init({
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => randomUUID(),
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    access_expires_in: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    refresh_expires_in: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Token',
    tableName: 'Token',
    timestamps: true
})

Token.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'user_id',
    as: 'user'
})

export { Token, TokenAttributes, TokenCreationAttributes };
