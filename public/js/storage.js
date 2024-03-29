require("date-format-lite"); // add date format
 
class Storage {
    constructor(db, isAdmin = false) {
        this._db = db;
        this.table = "events";
        this.isAdmin = isAdmin

    }
 
    // get events from the table, use dynamic loading if parameters sent
    async getAll(params, id) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];

        if(!this.isAdmin){

            query += " WHERE userID = ?"
            queryParams.push(id);
        }
    //     if (params.from && params.to) { 
    //         query += " `end_date` >= ? AND `start_date` < ?";
    //         queryParams.push(params.from);
    //         queryParams.push(params.to);
    // }
 
        let result = await this._db.query(query, queryParams);
        result.forEach((entry) => {
            // format date and time
            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
        
    }
 
    
    // create new event
    async insert(data) {
        let result = await this._db.query(
            "INSERT INTO events (start_date`, `end_date`, `text`) VALUES (?,?,?,?)",
            [this.table, data.fk, data.start_date, data.end_date, data.text]);
 
        return {
            action: "inserted",
            tid: result.insertId
        }
    }
 
    // update event
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);
 
        return {
            action: "updated"
        }
    }
 
    // delete event
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);
 
        return {
            action: "deleted"
        }
    }
}
 
module.exports = Storage;