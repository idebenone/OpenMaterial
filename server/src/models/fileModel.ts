import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { v4 as uuidv4 } from "uuid";

interface FileAttributes {
    file_id: string;
    file_name: string;
    file_content?: string;
    folder_id: string;
    workspace_id: string;
}

interface FileCreationAttributes extends Optional<FileAttributes, 'file_content'> { }

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
    public file_id!: string;
    public file_name!: string;
    public file_content?: string;
    public folder_id!: string;
    public workspace_id!: string;
}

File.init({
    file_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        unique: true
    },
    file_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "untitled",
    },
    file_content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    folder_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    workspace_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'File',
    tableName: 'File',
    timestamps: true
});

export { File, FileAttributes, FileCreationAttributes };
