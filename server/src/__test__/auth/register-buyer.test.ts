import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Register A User", () => {
  it("returns 201 on successful signup of a user", async () => {
    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(201);
  });

  it("sets a cookie on successful signup of a user", async () => {
    const response = await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });

  it("returns 400 with an invalid email", async () => {
    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john",
        password: "johnDoe123",
      })
      .expect(400);
  });

  it("disallows duplicate emails", async () => {
    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(201);

    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "Jane Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(400);
  });

  it("returns 400 with an invalid password", async () => {
    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "joh",
      })
      .expect(400);
  });

  it("returns 400 with any of the fields being empty", async () => {
    await request
      .post("/api/v1/auth/register")
      .send({
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(400);

    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        password: "johnDoe123",
      })
      .expect(400);

    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
      })
      .expect(400);
  });
});
