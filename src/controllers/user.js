import pool from "../config/database";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por nombre de usuario
    const [rows] = await pool.query(
      `SELECT * FROM user WHERE Email=? AND Password=?`,
      [email, password]
    );

    if (rows.length === 0) {
      // El usuario no existe
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si la contraseña coincide
    const user = rows[0];
    if (user.Password !== password) {
      // Contraseña incorrecta
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Usuario autenticado correctamente, devolver información del usuario
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM user `);
    const user = rows;
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error de servidor" });
  }
};
export const getUserId = (req, res) => {
  res.send("Registro de usuario por id");
};
export const registerUser = (req, res) => {
  res.send("Registro de usuario");
};
