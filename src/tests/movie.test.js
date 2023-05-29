const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

test("POST /movies", async () => {
  const movie = {
    name: "Hobbit",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTcwNTE4MTUxMl5BMl5BanBnXkFtZTcwMDIyODM4OA@@._V1_FMjpg_UX1000_.jpg",
    synopsis:
      "La trilogía de El hobbit, adaptación cinematográfica basada en la novela homónima, comprende tres películas épicas de fantasía, acción y aventuras: El hobbit: un viaje inesperado, El hobbit: la desolación de Smaug y El hobbit: la batalla de los Cinco Ejércitos",
    releaseYear: 2012,
  };
  const res = await request(app).post("/movies").send(movie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].genres).toBeDefined();
});

test("PUT /movies/:id", async () => {
  const newImageMovie = {
    image:
      "https://www.nacionflix.com/__export/1647558249921/sites/debate/img/2021/08/01/el-hobbit-warnerbros_crop1627863287290.jpg_1691101805.jpg",
  };
  const res = await request(app).put(`/movies/${movieId}`).send(newImageMovie);
  expect(res.status).toBe(200);
  expect(res.body.image).toBe(newImageMovie.image);
});

test("POST /movies/:id/actors", async () => {
  const actor = await Actor.create({
    firstName: "Larc",
    lastName: "Enciel",
    nationality: "Japon",
    image:
      "https://img1.ak.crunchyroll.com/i/spire4/153b13086666ec69bfe9c7cebe09b9d31619091066_main.jpg",
    birthday: "1990-11-14",
  });

  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors", async () => {
  const director = await Director.create({
    firstName: "Gabriel",
    lastName: "Nazaro",
    nationality: "Argentina",
    image:
      "https://img1.ak.crunchyroll.com/i/spire4/153b13086666ec69bfe9c7cebe09b9d31619091066_main.jpg",
    birthday: "1980-04-12",
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres", async () => {
  const genre = await Genre.create({ name: "LiveAction" });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /movies/:id", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});
