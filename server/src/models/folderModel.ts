import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { v4 as uuidv4 } from "uuid";
import { File, FileAttributes } from './fileModel';

interface FolderAttributes {
    folder_id: string;
    folder_name: string;
    parent_id?: string | null;
    workspace_id: string;
    files?: FileAttributes[]
    sub_folders?: FolderAttributes[],
}

interface FolderCreationAtrributes extends Optional<FolderAttributes, 'folder_id' | 'parent_id' | 'sub_folders' | 'files'> { }

class Folder extends Model<FolderAttributes, FolderCreationAtrributes> implements FolderAttributes {
    public folder_id!: string;
    public folder_name!: string;
    public parent_id?: string;
    public workspace_id!: string;
    public files?: FileAttributes[];
    public sub_folders?: FolderAttributes[];
}

Folder.init({
    folder_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        unique: true
    },
    folder_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "New Folder",
    },
    parent_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    workspace_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Folder',
    tableName: 'Folder',
    timestamps: true
});

Folder.hasMany(File, { foreignKey: 'folder_id', as: 'files' });
Folder.hasMany(Folder, { foreignKey: 'parent_id', as: 'sub_folders' });
Folder.belongsTo(Folder, { foreignKey: 'parent_id', as: 'parent' });

export { Folder, FolderAttributes, FolderCreationAtrributes };