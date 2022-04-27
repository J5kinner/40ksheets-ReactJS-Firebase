import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/jest-dom';
import Preview from "../components/Preview";
import singleColumnImg from "../assets/images/singleCol.webp";
import doubleColumnImg from "../assets/images/doubleCol.webp";
import { getByAltText } from "@testing-library/react";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("Renders the title of the previews for each of the column types", () => {
    act(() => {    render(<Preview />, container);  });  expect(container.textContent).toBe("");
    act(() => {
      render(<Preview title="Single Column" />, container);
    });
    expect(container.textContent).toBe("Single Column");
  
    act(() => {
      render(<Preview title="Double Column" />, container);
    });
    expect(container.textContent).toBe("Double Column");
  });

  // it("Renders the images of the different types with or without images", () => {
  //   act(() => {    render(<Preview />, container);  });  expect(container.textContent).toBe("");
  //   act(() => {
  //     render(<Preview image={singleColumnImg} />, container);
  //   });
  //   const items = getByAltText(/single column page/)
  //   expect(items).  
  //   act(() => {
  //     render(<Preview image="Double Column" />, container);
  //   });
  //   expect(container.textContent).toBe("Double Column");
  // });