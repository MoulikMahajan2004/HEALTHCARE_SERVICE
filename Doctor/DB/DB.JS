const db = require('mssql');
var cont;
async function db_connection() {
  try {
    if (!db.pool) {
      cont = await db.connect("Server=tcp:doctors-server.database.windows.net,1433;Initial Catalog=doctors;Persist Security Info=False;User ID=root-doctor;Password=P@ssword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
      return cont;
    }
  } catch (err) {
    console.error("❌ DB connection error:", err);
    throw err;
  }
}

module.exports = {
  db_connection,
  db, // export the raw db to use db.request()
  cont
};
