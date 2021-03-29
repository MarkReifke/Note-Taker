const express = require("express");
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');
//const {json} = require('express');
//const { Console } = require("node:console");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

async function readNotes() {
    const notes = await fs.promises.readFile("./db/db.json","utf8");
    return notes;
}
async function writeNotes(note) {
    const notes = await readNotes();
    const array = JSON.parse(notes);
    const newId = uuidv4();
    note.id = newId;
    array.push(note);
    const pushed = JSON.stringify(array);
    await fs.promises.writeFile("./db/db.json",pushed);
}
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});
app.post("/api/notes", (req, res) => {
    let note = req.body;
    writeNotes(note);
    res.send(req.body)
});
app.delete("/api/notes/:id", (req, res) => {
    const {id} = req.params;
    readNotes().then((data) => {
        const array = JSON.parse(data);
        const deleteIndex = array.findIndex(obj => obj['id'] === id);
        array.splice(deleteIndex1);
        fs.writeFile("./db/db.json", JSON.stringify(array), (err) => err? console.error(err): console.log("file written"));
    }).then(res.redirect('back'))
});
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public", "index.html"));

});
app.listen(PORT,() => console.log("App listening on port" + PORT));