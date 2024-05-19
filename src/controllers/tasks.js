import pool from "../config/database";

export const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT 
    t.*, 
    u1.Id as UserId,
    u1.Nombre as UserNombre,
    u1.Apellido as UserApellido,
    u1.Email as UserEmail,
    u1.Img as UserImg,
    u2.Id as AssignedId,
    u2.Nombre as AssignedNombre,
    u2.Apellido as AssignedApellido,
    u2.Email as AssignedEmail,
    u2.Img as AssignedImg 
FROM 
    tasks t 
LEFT JOIN 
    user u1 ON t.IdUser = u1.Id 
LEFT JOIN 
    user u2 ON t.IdAssigned = u2.Id ORDER BY FechaEnd ASC`);

    res.json(rows);
    // Further processing or sending response to client
  } catch (error) {
    console.error(error);
    // Handle error and send appropriate response to client
  }
};
export const getTasksCount = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT COUNT(*) FROM tasks`);

    res.json(rows[0]["COUNT(*)"]);
    // Further processing or sending response to client
  } catch (error) {
    console.error(error);
    // Handle error and send appropriate response to client
  }
};

export const getTask = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
    t.*, 
    u1.Id as UserId,
    u1.Nombre as UserNombre,
    u1.Apellido as UserApellido,
    u1.Email as UserEmail,
    u1.Img as UserImg,
    u2.Id as AssignedId,
    u2.Nombre as AssignedNombre,
    u2.Apellido as AssignedApellido,
    u2.Email as AssignedEmail,
    u2.Img as AssignedImg 
FROM 
    tasks t 
LEFT JOIN 
    user u1 ON t.IdUser = u1.Id 
LEFT JOIN 
    user u2 ON t.IdAssigned = u2.Id WHERE IdAssigned=? ORDER BY FechaEnd ASC`,
      [req.params.id]
    );

    res.json(rows);
    // Further processing or sending response to client
  } catch (error) {
    console.error(error);
    // Handle error and send appropriate response to client
  }
};
export const createTask = async (req, res) => {
  try {
    const { nombre, descripcion, fechaEnd, idUser, idAssigned } = req.body;

    // Execute the insert query
    const [result] = await pool.query(
      `INSERT INTO tasks (Nombre, Descripcion, FechaEnd, IdUser, IdAssigned,FechaEmision,Completed) VALUES (?, ?, ?, ?, ?,NOW(),0)`,
      [nombre, descripcion, fechaEnd, idUser, idAssigned]
    );

    // Extract the ID of the inserted task
    const insertedId = result.insertId;

    // Send a success response
    res.status(201).json({ id: insertedId });
  } catch (error) {
    console.error(error);
    // Handle error and send appropriate response to client
    res.status(500).json({ error: "An error occurred while saving the task." });
  }
};
export const deleteTask = async (req, res) => {
  try {
    // Execute the delete query
    const [result] = await pool.query(`DELETE FROM tasks WHERE id=?`, [
      req.params.id,
    ]);

    console.log(result);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    // Handle error and send appropriate response to client
    res
      .status(500)
      .json({ error: "An error occurred while deleting the task." });
  }
};
export const putTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body; // Extract title and description from request body
    const connection = await connect();

    // Execute the update query
    const [result] = await pool.query(
      `UPDATE tasks SET title=?, description=? WHERE id=?`,
      [title, description, id]
    );

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    // Handle error and send appropriate response to client
    res
      .status(500)
      .json({ error: "An error occurred while updating the task." });
  }
};
