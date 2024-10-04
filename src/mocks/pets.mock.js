import { fakerES_MX as faker } from "@faker-js/faker";

export const generatePetsMock = (amount) => {

  const pets = [];
  for (let i = 0; i < amount; i++) {
    const pet = {
      name: faker.person.firstName(),
      specie: faker.animal.type(),
      adopted: faker.datatype.boolean(),
      birthDate: faker.date.birthdate(),
      image: faker.image.urlPicsumPhotos(),

    };
    pets.push(pet);
  }

  return pets;
};