import express, { Request, Response } from "express";
import dotenv from "dotenv";
import commentsRoutes from "./routes/commentsRoutes";
import cors from "cors";
dotenv.config();
const corsOptions = {
  origin: "http://localhost:5173", // Permitir solo este origen
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.get("/api/", (req: Request, res: Response) => {
  res.send("¡Server with TS working!");
});

app.use("/api/comments", commentsRoutes);
export default app;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
