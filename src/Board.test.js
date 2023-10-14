import { fireEvent, render } from '@testing-library/react';
import Board from './Board';


  it('renders without crashing', () => {
    render(<Board chanceLightStartsOn={1} />);
  });
  
  it('matches snapshot', () => {
    const { asFragment } = render(<Board chanceLightStartsOn={1}/>);
    expect(asFragment()).toMatchSnapshot();
  }); 

  it("shows a win when all lights are out", function() {
    const { getByText } = render(<Board chanceLightStartsOn={0} />);
    expect(getByText("You have Won!")).toBeInTheDocument();
  });

  it('it handles cell clicking and toggles', () => {
    const { getAllByRole } = render(
        <Board nrows={2} ncols={2} chanceLightStartsOn={1} />
        );
      
    const cells = getAllByRole("cell");
      
    cells.forEach(cell => {
      expect(cell).toHaveClass("Cell-lit");
    });

    fireEvent.click(cells[0]);

    expect(cells[0]).not.toHaveClass("Cell-lit");
    expect(cells[1]).not.toHaveClass("Cell-lit");
    expect(cells[2]).not.toHaveClass("Cell-lit");
  });

