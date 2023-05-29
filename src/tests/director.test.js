const request = require("supertest");
const app = require("../app");

test("POST /directors", async () => {
  const director = {
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "Estados Unidos",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg",
    birthday: "1946-12-18",
  };

  const res = await request(app).post("/directors").send(director);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /directors", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id", async () => {
  const newImageDirector = {
    image:
      "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KPQ3KKNVHHVOLMSOAGQPHWXBLQ.jpg",
  };

  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(newImageDirector);
  expect(res.status).toBe(200);
  expect(res.body.image).toBe(newImageDirector.image);
});

test("DELETE /directors/:id", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
});
