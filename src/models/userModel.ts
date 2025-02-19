import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/databaseConfig";

// Define the attributes for the User model
interface UserAttributes {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  password: string;
  deleted: boolean;
}

// Define which attributes are optional when creating a new User instance.
// Here, "id" and "deleted" are optional because id is auto-generated and deleted defaults to false.
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "deleted"> {}

// Define the User model using Sequelize's define method.
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    modelName: "user",
    tableName: "users",
    timestamps: true,
  }
);

// Sync the model with the database.
// The `alter: true` option ensures the table is updated to match the model if it already exists.
User.sync({ alter: true })
  .then(() => {
    console.log('The "Users" table has been successfully created or updated.');
  })
  .catch((error) => {
    console.error('Error syncing the "Users" table:', error);
  });

export { User };
