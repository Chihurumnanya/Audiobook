import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";

interface ConversationAttributes {
  id: string;
  question: string;
  answer: string;
  userId?: string; 
}

interface ConversationCreationAttributes extends Optional<ConversationAttributes, "id" | "userId"> {}

const Conversation = sequelize.define<Model<ConversationAttributes, ConversationCreationAttributes>>(
  "Conversation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "conversations",
    timestamps: true,
  }
);

Conversation.sync({ alter: true })
.then(() => {
  console.log(
      "Conversation table has been successfully created/updated."
  );
})
.catch((error) => {
  console.error("Error syncing Conversation table:", error);
});

export { Conversation };
