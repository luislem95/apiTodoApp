import express from "express";
import tasksRoutes from "./routes/tasks";
import userRoutes from "./routes/user";
import cors from "cors";

// Opciones de configuración de CORS
const corsOptions = {
  origin: "http://localhost:3000", // Permite solicitudes desde este origen
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  credentials: true, // Permite el envío de credenciales como cookies
};

const app = express();

// Respuesta para solicitudes de favicon.ico para evitar errores en el log
app.get("/favicon.ico", (req, res) => {
  res.status(204).end(); // Devuelve una respuesta 204 No Content y finaliza
});

// Middleware para manejar CORS
app.use(cors(corsOptions));

// Middleware para parsear cuerpos de solicitud en formato JSON
app.use(express.json());

// Rutas de usuario
app.use(userRoutes);

// Rutas de tareas
app.use(tasksRoutes);

export default app;
