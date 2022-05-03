import supertest from "supertest";
import app from "../../app";

const request = supertest(app);

describe("Current user", () => {
  it("responds with details about the current user", async () => {});
});
