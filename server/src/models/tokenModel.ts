import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { User } from "./userModel";
import { randomUUID } from "crypto";

interface TokenAttributes {
    token_id: string;
    user_id: string;
    token_name: string;
    access_token: string;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'token_id'> { }

class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
    public token_id!: string;
    public user_id!: string;
    public token_name!: string;
    public access_token!: string;

    public user!: User;
}

Token.init({
    token_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: () => randomUUID(),
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: DataTypes.UUID,
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
}, {
    sequelize,
    modelName: 'Token',
    tableName: 'Token',
    timestamps: true
})

export { Token, TokenAttributes, TokenCreationAttributes };
