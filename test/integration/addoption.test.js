import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8081/api/adoptions");
const requestUser = supertest("http://localhost:8081/api/users");
const requestPets = supertest("http://localhost:8081/api/pets");

describe("Test de integracion Adoptions", () => {

    let petId
    let userId
    let adoptedId
    it("[GET] /api/adoptions - Deve devolver todas las adopciones", async () => {

        const { status, body } = await request.get("/")
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("array");
    })

    it("[POST] /api/adoptions - Deve crear una adopcion", async () => {

        //-------------Creamos un usuario y obtenemos el ID------------------------//
        const newUser = {
            first_name: "UserAdoptionTest",
            last_name: "UserAdoptionTest",
            email: "UserAdoptionTest@test.com",
            password: "123"
        };

        await requestUser.post("/").send(newUser);

        const usersTest = await requestUser.get("/");
        const idUser = usersTest.body.payload.find(user => user.email === newUser.email);
      
        //-------------Creamos una mascota y obtenemos el ID------------------------//

        const newPet = {
            name: "Pet Test1",
            specie: "Perro1",
            birthDate: "11/1/2020",
            imgage:"fdsfs1",
        };
        
        await requestPets.post("/").send(newPet);

        const petTest = await requestPets.get("/");
        const idPet = petTest.body.payload.find(pet => pet.name === newPet.name);
        
        const { status, body } = await request.post(`/${idUser._id}/${idPet._id}`)
        userId = idUser._id
        petId = idPet._id
        adoptedId = body.payload._id
        expect(status).to.be.equal(200)
        expect(body).to.be.an("Object");
        
    });
    
    it("[DELETE] /api/adoptions/:aid - Debe eliminar una adopcion", async () =>{

        const { status, body } = await request.delete(`/${adoptedId}`);
        expect(status).to.be.equal(200)
        expect(body).to.be.an("Object");
    });

    after(async () => {
        await requestPets.delete(`/${petId}`)
    })
    
})