import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

// Buyer Login tests
describe("Signin a User", () => {
  it("should return 400 on invalid email of a user", async () => {
    await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(201);

    await request
      .post("/api/v1/auth/signin")
      .send({
        email: "john",
        password: "johnDoe123",
      })
      .expect(400);
  });

  it("should return 400 on incorrect password of buyer", async () => {
    await request
      .post("/api/v1/auth/register-buyer")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(201);

    await request
      .post("/api/v1/auth/signin")
      .send({
        email: "john@doe.com",
        password: "johnDoe",
      })
      .expect(400);
  });

  it("should return a cookie header on successful signin", async () => {
    await request
      .post("/api/v1/auth/register-buyer")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(201);

    const response = await request
      .post("/api/v1/auth/signin")
      .send({
        email: "john@doe.com",
        password: "johnDoe123",
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
