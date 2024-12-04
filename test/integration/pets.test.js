import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8081/api/pets");

describe("Test de integracion Pets", () =>{

    //variable para guardar los datos de un pet y obtener el ID
    let petTest 

    it("[GET] /api/pets - Debe devolver un array de mascotas", async () =>{
        
        const {status, body} = await request.get("/")
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("array");
    })

    it("[POST] /api/pets - Debe crear una nueva mascota", async () =>{

        const newPet = {
            name: "Pet Test",
            specie: "Perro",
            birthDate: "1/1/2020",
            imgage:"fdsfs",
        };
        const { status, body } = await request.post("/").send(newPet);
        
        petTest = body.payload;
        expect(status).to.be.equal(201)
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Pet Test");
        expect(body.payload.specie).to.be.equal("Perro");
        expect(body.payload.adopted).to.be.equal(false);
    });

    it("[PUT] /api/pets/:pid - Debe actualizar una mascota", async () =>{

        const newPet = {
            specie: "Perro",
        };
        const { status, body } = await request.put(`/${petTest._id}`).send(newPet);
        expect(status).to.be.equal(200)
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Pet Test");
        expect(body.payload.specie).to.be.equal("Perro");
        expect(body.payload.adopted).to.be.equal(false);
    });

    it("[DELETE] /api/pets/:pid - Debe eliminar una mascota", async () =>{

        const { status, body } = await request.delete(`/${petTest._id}`);
        expect(status).to.be.equal(200)
        expect(body.message).to.be.equal("pet deleted");
        
    });
})