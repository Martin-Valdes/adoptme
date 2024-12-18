import { expect } from "chai";
import supertest from "supertest";


const request = supertest("http://localhost:8081/api/sessions");
const userRequest = supertest("http://localhost:8081/api/users");

describe("Test integrales de Sessions", () => {
    let userTest;
    it("[POST] /api/sessions/register - Debe registrar un usuario", async () => {

        const newUser = {
            first_name: "User",
            last_name: "Test",
            email: "test@test.com",
            password: "123"
        }
        const { status, body } = await request.post("/register").send(newUser);
        userTest = body.payload;
        expect(status).to.be.equal(201)
        expect(body.status).to.be.equal("success");
        expect(body.payload).to.be.an("object");
        expect(body.payload.email).to.be.equal(newUser.email);
        expect(body.payload.first_name).to.be.equal(newUser.first_name);
        expect(body.payload.password).to.not.be.equal(newUser.password);
        expect(body.payload.last_name).to.be.equal(newUser.last_name);

    });

    it("[POST] /api/sessions/login - Debe loguear un usuario", async () => {

        const data = {
            email: "test@test.com",
            password: "123"
        }
        const { status, body } = await request.post("/login").send(data);
       
        expect(status).to.be.equal(200)
        expect(body.status).to.be.equal("success");
        expect(body.message).to.be.an("string");
    })

    after(async () => {
        await userRequest.delete(`/${userTest._id}`);
    })
})