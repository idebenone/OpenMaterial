import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { randomUUID } from "crypto";

interface WorkspaceAttributes {
    workspace_id: string;
    user_id: string;
    workspace_name: string;
    workspace_description: string;
    is_private: boolean;
}

interface WorkspaceCreationAttributes extends Optional<WorkspaceAttributes, "workspace_id"> { }

class Workspace extends Model<WorkspaceAttributes, WorkspaceCreationAttributes> implements WorkspaceAttributes {
    public workspace_id!: string;
    public user_id!: string;
    public workspace_name!: string;
    public workspace_description!: string;
    public is_private!: boolean;
}

Workspace.init({
    workspace_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => randomUUID(),
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    workspace_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "untitled"
    },
    workspace_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Workspace',
    tableName: 'Workspace',
    timestamps: true,
})

export { Workspace, WorkspaceAttributes, WorkspaceCreationAttributes }