import mongoose from "mongoose";

export default async () => {
    const connUri = "mongodb://43.203.4.205:27717/";
    try {
        console.log("嘗試連線資料庫......");
        // await mongoose.connect(config.dburl, DB_OPTIONS)
        mongoose.promise = global.Promise;
        await mongoose.connect(connUri, {
            ssl: true,
            tlsCAFile: `./mongoKey/ca.pem`,
            tlsCertificateKeyFile: `./mongoKey/client.pem`,
            directConnection: true,
            tlsAllowInvalidHostnames: true,
            tlsCertificateKeyFilePassword: "test1234",
            serverSelectionTimeoutMS: 60000,
        });
        console.log('DB connection established');

        //const connection = mongoose.connection;
        //connection.on("error", (err) => {
        //    console.log("資料庫連線失敗：" + err);
        //    //process.exit();
        //});
        //connection.once("open", () => {
        //    console.log("資料庫連線成功");
        //});
    } catch (error) {
        console.error('DB connection failed', error);
    }
}
