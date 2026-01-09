console.log(process.env.DATABASE_URL)

const request = require ("supertest");
const app = require ("../app");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

beforeEach (async () => {
    await prisma.task.deleteMany();
})

describe ("GET /tasks", () => {
    it ("should return 200", async () => {
  const response = await request(app).get("/tasks");

  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);
    })
})