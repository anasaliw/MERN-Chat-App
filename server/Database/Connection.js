import mongoose from "mongoose";

const Connection = async (URL) => {
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default Connection;
