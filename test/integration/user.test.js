import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8081/api/users");

describe("Test de integracion Users", () => {

    let usersTest

    it("[GET] /api/users - Debe devolver un array vacio", async () => {

        const { status, body } = await request.get("/")
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("array");
    })
    
    it("[POST] /api/users - Debe crear un nuevo usuario", async () => {
            const newUser = {
                first_name: "UserA",
                last_name: "TestA",
                email: "testUser@test.com",
                password: "123"
            }
            const { status, body } = await request.post("/").send(newUser);
            usersTest = body.payload;
            expect(status).to.be.equal(201)
            expect(body.payload).to.be.an("object");
            expect(body.payload.first_name).to.be.equal("UserA");
            expect(body.payload.last_name).to.be.equal("TestA");
            expect(body.payload.email).to.be.equal("testUser@test.com");
    });
    
    it("[GET] /api/users - Debe devolver un usuario", async () => {

        const { status, body } = await request.get(`/${usersTest._id}`)
        expect(status).to.be.equal(200)
        expect(body.payload._id).to.be.an("string");
    });

    it("[PUT] /api/users/:uid - Debe actualizar un usuario", async () =>{
        
        const newData = {
            first_name: "newName",
        };
        const { status, body } = await request.put(`/${usersTest._id}`).send(newData);

        expect(status).to.be.equal(201)
        expect(body.payload).to.be.an("object");
        expect(body.payload.first_name).to.be.equal("newName");
        expect(body.payload.last_name).to.be.equal("TestA");
        expect(body.payload.email).to.be.equal("testUser@test.com");
    });

    it("[DELETE] /api/users/:uid - Debe eliminar un usuario", async () =>{

        const { status, body } = await request.delete(`/${usersTest._id}`);
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("User deleted");

    });
})