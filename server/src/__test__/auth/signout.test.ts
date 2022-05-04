import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Signout a User", () => {
  it("should clear the user's cookie on signout", async () => {
    const signInResponse = await request
      .post("/api/v1/auth/register")
      .send({
        fullName: "John Doe",
        email: "john@doe.com",
        password: "johnDoe123",
        confirmPassword: "johnDoe123",
      })
      .expect(201);
    const cookie = signInResponse.get("Set-Cookie");

    const response = await request
      .get("/api/v1/auth/signout")
      .set("Cookie", cookie)
      .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
    expect(response.get("Set-Cookie")[0]).toBe(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
