import pool from "@/lib/db";

// =======================
// GET - Read All Students
// =======================
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id"
    );

    return Response.json(result.rows);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// =======================
// POST - Add Student
// =======================
export async function POST(request) {
  try {
    const { name, email, age } = await request.json();

    const result = await pool.query(
      "INSERT INTO students (name,email,age) VALUES ($1,$2,$3) RETURNING *",
      [name, email, age]
    );

    return Response.json(result.rows[0], {
      status: 201,
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// =======================
// PUT - Update Student
// =======================
export async function PUT(request) {
  try {
    const { id, name, email, age } =
      await request.json();

    const result = await pool.query(
      `UPDATE students
       SET name=$1,
           email=$2,
           age=$3
       WHERE id=$4
       RETURNING *`,
      [name, email, age, id]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// =======================
// DELETE - Delete Student
// =======================
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await pool.query(
      "DELETE FROM students WHERE id=$1",
      [id]
    );

    return Response.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
