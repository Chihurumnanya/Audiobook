import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";

// Define the attributes for the Document model.
interface DocumentAttributes {
  id: string;
  originalName: string;
  filePath: string;
  extractedText?: string; // This will hold the text extracted from the PDF.
  userId?: string;        // Optionally associate a document with a user.
}

// Specify which attributes are optional when creating a new record.
interface DocumentCreationAttributes extends Optional<DocumentAttributes, "id" | "extractedText" | "userId"> {}

// Define the Document model.
const Document = sequelize.define<Model<DocumentAttributes, DocumentCreationAttributes>>(
  "Document",
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
    extractedText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    modelName: "document",
    tableName: "documents",
    timestamps: true,
  }
);

// Sync the model with the database.
Document.sync({ alter: true })
  .then(() => {
    console.log(
        "Documents table has been successfully created/updated."
    );
})
  .catch((error) => {
    console.error("Error syncing Documents table:", error);
});

export { Document };
