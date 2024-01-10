import request from "supertest";
import router from "../index";

describe("Authentication API", () => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
  }

  const randomUsername = "user" + generateRandomNumber();
  const randomPassword = "pass" + generateRandomNumber();

  const randomUser = {
    username: randomUsername as string,
    password: randomPassword as string
  };

  const existingUser = {
    username: "existinguser",
    password: "existingpassword"
  };

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const response = await request(router)
        .post("/auth/register")
        .send({ username: randomUser.username, password: randomUser.password })
        .expect(201);

      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("success", true);
    });

    it("should return an error for duplicate username", async () => {
      const response = await request(router).post("/auth/register").send(existingUser).expect(503);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("POST /login", () => {
    it("should log in with valid credentials", async () => {
      const response = await request(router)
        .post("/auth/login")
        .send({ username: randomUser.username, password: randomUser.password })
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("success", true);
    });

    it("should return an error for invalid credentials", async () => {
      const response = await request(router)
        .post("/auth/login")
        .send({ username: "invaliduser", password: "invalidpassword" })
        .expect(401);

      expect(response.body).toHaveProperty("error");
      expect(response.body).toHaveProperty("success", false);
    });
  });
});
