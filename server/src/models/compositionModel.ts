import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/pgConnection";
import { randomUUID } from "crypto";
import zlib from "zlib";

interface CompositionAttributes {
    composition_id: string;
    user_id: number;
    composition_name: string;
    composition_description: string;
    composition_chart: Buffer;
}

interface CompositionCreationAttributes extends Optional<CompositionAttributes, 'composition_chart'> { }

class Composition extends Model<CompositionAttributes, CompositionCreationAttributes> implements CompositionAttributes {
    public composition_id!: string;
    public user_id!: number;
    public composition_name!: string;
    public composition_description!: string;
    public composition_chart!: Buffer;
}

Composition.init({
    composition_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => randomUUID(),
        primaryKey: true,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    composition_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "untitled"
    },
    composition_description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    composition_chart: {
        type: DataTypes.BLOB,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Composition',
    tableName: 'Composition',
    timestamps: true,
    hooks: {
        beforeSave: async (composition: Composition) => {
            if (composition.composition_chart) {
                composition.composition_chart = zlib.gzipSync(composition.composition_chart);
            }
        }
    }
})

export { Composition, CompositionAttributes, CompositionCreationAttributes }