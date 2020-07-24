//import what I am testing
const auth = require("./auth-router.js");
const supertest = require("supertest");
const server = require("../api/server");

const users = [
	{
		username: "user1",
		password: "abcde",
	},
	{
		username: "user2",
		password: "abcd",
	},
	{
		username: "user1",
		password: "Abcd",
	},
];

//tests

describe("Register tests", () => {
	//passes only fails because needs to be unique username each time
	it("user can register", () => {
		return supertest(server)
			.post("/api/auth/register")
			.send({ username: "user5", password: "asdf" })
			.then((res) => {
				expect(res.status).toBe(201);
			});
	});
	//passes
	it("username is not unique, res 500", () => {
		return supertest(server)
			.post("/api/auth/register")
			.send(users[0])
			.then((res) => {
				expect(res.status).toBe(500);
			});
	});
});

describe("Login tests", () => {
	//passes
	it("successful login, res 200", () => {
		return supertest(server)
			.post("/api/auth/login")
			.send(users[0])
			.then((res) => {
				expect(res.status).toBe(200);
			});
	});
	it("failed login wrong password, res 401", () => {
		return supertest(server)
			.post("/api/auth/login")
			.send(users[2])
			.then((res) => {
				expect(res.status).toBe(401);
				expect(res.type).toMatch(/json/i);
			});
	});
});
