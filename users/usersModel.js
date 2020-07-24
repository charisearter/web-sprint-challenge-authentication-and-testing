const db = require("../database/dbConfig.js");
//model to help validate users
module.exports = {
    add,
    find,
    findBy,
    findById,
};

function find() {
    return db("users");
}

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function findById(id) {
    return db("users").where({ id }).first();
}