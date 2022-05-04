import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Current user", () => {
  it("responds with details about the current user", async () => {
    const signUpResponse = await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
        confirmPassword: "johnDoe123",
      })
      .expect(201);
    const cookie = signUpResponse.get("Set-Cookie");

    const response = await request
      .get("/api/v1/auth/current-user")
      .set("Cookie", cookie)
      .expect(200);

    expect(response.body.currentUser.email).toBe("john@doe.com");
  });

  it("responds with null when a user has signed out", async () => {
    const signUpResponse = await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
        confirmPassword: "johnDoe123",
      })
      .expect(201);
    let cookie = signUpResponse.get("Set-Cookie");

    await request.get("/api/v1/auth/signout").set("Cookie", cookie).expect(200);

    const currentUser = await request
      .get("/api/v1/auth/current-user")
      .expect(401);

    expect(currentUser.body.currentUser).toBe(null);
  });
});
