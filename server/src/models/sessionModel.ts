import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { randomUUID } from "crypto";

interface SessionAttributes {
    session_id: string;
    user: string;
    device: string;
    location: string;
    ip: string;
}

interface SessionCreationAttributes { };

class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
    public session_id!: string;
    public user!: string;
    public device!: string;
    public location!: string;
    public ip!: string;
}

Session.init({
    session_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => randomUUID(),
        primaryKey: true,
        unique: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    device: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Session',
    tableName: 'Session',
    timestamps: true,
})

export { Session, SessionAttributes, SessionCreationAttributes }