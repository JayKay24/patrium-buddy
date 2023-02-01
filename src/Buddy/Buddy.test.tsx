import { Buddy } from "./Buddy";
import { render, fireEvent, screen } from '../helpers/test-utils';
import { setupServer } from "msw/node";
import { rest } from "msw";

const server = setupServer(
  rest.get('./data.json', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      {
        "ix": 0,
        "isActive": true,
        "picture": "http://placehold.it/32x32",
        "dob": "1993-01-24",
        "age": "29",
        "name": "Long Rogers",
        "gender": "female",
        "department": "Human resources",
        "id": "63c64b1ff1d4dc9e09b90b96",
        "email": "long_rogers@patriumhealth.com",
        "username": "long93"
      },
    ]))
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const renderBuddy = (props = {}) => {
  render(<Buddy department="Engineering" { ...props } />)
};

describe("Buddy.tsx", () => {
  it("should display `Get a Buddy` button", async () => {
    renderBuddy();
    screen.getByText(/Get a Buddy/i);
  });

  it('Should display `loading data...` when button is clicked', () => {
    renderBuddy();
    fireEvent.click(screen.getByText(/get a buddy/i));
    expect(screen.getByText(/loading data.../i)).toBeInTheDocument();
  });
});