import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("pern_sneaker", "postgres", "root", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0, 
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
    freezeTableName: true, 
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối PostgreSQL thành công!");
    await sequelize.query("SELECT 1");
    console.log("Kiểm tra kết nối thành công!");
  } catch (err) {
    console.error("Không thể kết nối đến PostgreSQL:", err);
    throw err; 
  }
};
