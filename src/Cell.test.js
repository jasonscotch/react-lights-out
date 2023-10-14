import { render } from '@testing-library/react';
import Cell from './Cell';
  

    let table;
    
    beforeEach(() => {
      let tr = document.createElement("tr");
      table = document.body.appendChild(tr);
    });
  
    it("renders without crashing", () => {
      render(<Cell />, { table });
    });
  
    it("matches snapshot - lit", () => {
      const { asFragment } = render(<Cell isLit />, { table });
      expect(asFragment()).toMatchSnapshot();
    });
  
    it("matches snapshot - not lit", () => {
      const { asFragment } = render(<Cell />, { table });
      expect(asFragment()).toMatchSnapshot();
    });
  