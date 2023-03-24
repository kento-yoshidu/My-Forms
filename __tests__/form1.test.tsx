import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { setupServer } from "msw/node"

import "@testing-library/jest-dom/extend-expect"
import 'cross-fetch/polyfill'

import Form1 from "../pages/form1"

const server = setupServer(
  rest.post("/api/form1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: "KENTO" }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

describe("Form1", () => {
  it("Rendering Form1", () => {
    render(<Form1 />)
    expect(screen.getByTestId("page-title")).toHaveTextContent(/^Form1$/)
  })

  it("送信テスト", async () => {
    render(<Form1 />)
    const nameForm = screen.getByTestId("name") as HTMLInputElement
    await userEvent.type(nameForm, "kento")
    await userEvent.click(screen.getByTestId("submit"))
    screen.debug()
  })
})
