import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('pern_sneaker', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, 
});

sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Đồng bộ bảng thành công!");
  })
  .catch((error) => {
    console.error("Lỗi khi đồng bộ bảng:", error);
  });



sequelize.authenticate()
  .then(() => {
    console.log('Đã kết nối thành công đến PostgeSQL với Sequelize');
  })
  .catch((err) => {
    console.error('Không thể kết nối đến Postgres với Sequelize:', err);
  });

