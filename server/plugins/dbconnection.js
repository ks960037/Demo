import mongoose from 'mongoose'
const mongodbUri = useRuntimeConfig().mongodbUri
console.log('檢查', mongodbUri)
export default async () => {
  try {
    console.log('嘗試連線資料庫......')
    // await mongoose.connect(config.dburl, DB_OPTIONS)
    mongoose.promise = global.Promise
    await mongoose.connect(mongodbUri, {
      ssl: true,
      tlsCAFile: `./mongoKey/ca.pem`,
      tlsCertificateKeyFile: `./mongoKey/client.pem`,
      directConnection: true,
      tlsAllowInvalidHostnames: true,
      tlsCertificateKeyFilePassword: 'test1234',
      serverSelectionTimeoutMS: 60000
    })
    console.log('DB connection established')

    //const connection = mongoose.connection;
    //connection.on("error", (err) => {
    //    console.log("資料庫連線失敗：" + err);
    //    //process.exit();
    //});
    //connection.once("open", () => {
    //    console.log("資料庫連線成功");
    //});
  } catch (error) {
    console.error('DB connection failed', error)
  }
}
