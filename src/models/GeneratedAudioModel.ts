import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";

export interface GeneratedAudioAttributes {
  id: string;
  originalName: string;
  filePath: string;
  inputText: string;
  language?: string;
  voice?: string;
  duration?: number;
  userId?: string;
}

export interface GeneratedAudioCreationAttributes extends Optional<GeneratedAudioAttributes, "id" | "language" | "voice" | "duration" | "userId"> {}

const GeneratedAudio = sequelize.define<Model<GeneratedAudioAttributes, GeneratedAudioCreationAttributes>>(
  "GeneratedAudio",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inputText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voice: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    modelName: "generated_audio",
    tableName: "generated_audio",
    timestamps: true,
  }
);

GeneratedAudio.sync({ alter: true })
.then(() => {
  console.log(
      "GeneratedAudio table has been successfully created/updated."
  );
})
.catch((error) => {
  console.error("Error syncing GeneratedAudio table:", error);
});

export { GeneratedAudio };
