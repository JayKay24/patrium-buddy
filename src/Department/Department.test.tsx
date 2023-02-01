import { Department } from "./Department";
import { render, fireEvent, screen } from "../helpers/test-utils";

const renderDepartment = (props = {}) => {
  render(<Department department="Engineering" setDepartment={() => {}} {...props} />)
};

describe("Department.tsx", () => {
  it('shows `Engineering` as part of initial render', () => {
    renderDepartment();
    expect(screen.getByText(/engineering/i)).toBeInTheDocument();
  });
});