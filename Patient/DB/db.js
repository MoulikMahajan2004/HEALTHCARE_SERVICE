const db= require('mssql');
var cont;
async function db_connection() {
    try {
        if (!db.pool) {
            //connection string to db of patients 
            cont = await db.connect("Server=tcp:doctors-server.database.windows.net,1433;Initial Catalog=Patients;Persist Security Info=False;User ID=root-doctor;Password=P@ssword;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            return cont;
        }
    } catch (err) {
        console.error("❌ DB connection error:", err);
        throw err;
    }
}

module.exports = {
    db_connection,
    db,
    cont
};
