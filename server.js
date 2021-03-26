const express = require("express");
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');
const {json} = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

async function readNotes() {
    const notes = await fs.promises.readFile('./db/db.json','utf8');
    return notes;
}
async function writeNotes