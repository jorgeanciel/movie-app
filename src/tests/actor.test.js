const request = require("supertest");
const app = require("../app");

test("POST /actors", async () => {
  const actor = {
    firstName: "Hyde",
    lastName: "Larc",
    nationality: "Japon",
    image:
      "https://i.pinimg.com/originals/01/cb/0f/01cb0f520383b00752f7e11f7ec3b103.jpg",
    birthday: "1980-11-12",
  };
  const res = await request(app).post("/actors").send(actor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id", async () => {
  const newActor = {
    firstName: "aiko",
    lastName: "tomioka",
  };

  const res = await request(app).put(`/actors/${actorId}`).send(newActor);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(newActor.firstName);
  expect(res.body.lastName).toBe(newActor.lastName);
});

test("DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
});
