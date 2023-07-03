import { render, screen, fireEvent } from '@testing-library/react';
import MUITable from '../MUITable';
import {RenderPokemonsColumns} from "../../../constants";
import { BrowserRouter } from 'react-router-dom';

describe('MUITable', () => {
    const data = {
        pokemon_v2_pokemon: [
        {
        id: 1,
        name: "bulbasaur",
        height: 7,
        base_experience: 64,
        is_default: true
        },
        {
        id: 2,
        name: "ivysaur",
        height: 10,
        base_experience: 142,
        is_default: true
        },
        {
        id: 3,
        name: "venusaur",
        height: 20,
        base_experience: 263,
        is_default: true
        },
        {
        id: 4,
        name: "charmander",
        height: 6,
        base_experience: 62,
        is_default: true
        },
        {
        id: 5,
        name: "charmeleon",
        height: 11,
        base_experience: 142,
        is_default: true
        },
        {
        id: 6,
        name: "charizard",
        height: 17,
        base_experience: 267,
        is_default: true
        },
        {
        id: 7,
        name: "squirtle",
        height: 5,
        base_experience: 63,
        is_default: true
        },
        {
        id: 8,
        name: "wartortle",
        height: 10,
        base_experience: 142,
        is_default: true
        },
        {
        id: 9,
        name: "blastoise",
        height: 16,
        base_experience: 265,
        is_default: true
        },
        {
        id: 10,
        name: "caterpie",
        height: 3,
        base_experience: 39,
        is_default: true
        }
        ],
        pokemon_v2_pokemon_aggregate: {
        aggregate: {
        count: 1279
        }
        }
        }
  test('renders checkboxes when renderCheckbox is true', () => {
    const handleChangeSelectedItems = jest.fn();

    render(
        <BrowserRouter>
            <MUITable
              columns={RenderPokemonsColumns}
              showPagination={true}
              data={data}
              renderCheckbox={true} 
              renderDeleteButton={false}
              handleChangeSelectedItems={handleChangeSelectedItems}
            />
            </BrowserRouter>
    );

    const checkboxes = screen.queryAllByTestId('checkbox');
    expect(checkboxes).toHaveLength(data.pokemon_v2_pokemon.length);
  
  });
  
  test('does not render checkboxes when renderCheckbox is false', () => {
    const handleChangeSelectedItems = jest.fn();

    render(
        <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false} 
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
        />
        </BrowserRouter>
    );

    const checkboxes = screen.queryAllByTestId('checkbox');
    expect(checkboxes).toHaveLength(0);
  });

  test('render delete button' , () => {
    const handleChangeSelectedItems = jest.fn();

    render(
        <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false} 
          renderDeleteButton={true}
          handleChangeSelectedItems={handleChangeSelectedItems}
        />
        </BrowserRouter>
    );

    const deleteButtons = screen.queryAllByTestId('delete-button');
    expect(deleteButtons).toHaveLength(data.pokemon_v2_pokemon.length);
  })

  test('doesnt render delete button' , () => {
    const handleChangeSelectedItems = jest.fn();

    render(
        <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false} 
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
        />
        </BrowserRouter>
    );

    const deleteButtons = screen.queryAllByTestId('delete-button');
    expect(deleteButtons).toHaveLength(0);
  })

  test('show pagination' , () => {
    const handleChangeSelectedItems = jest.fn();

    render(
        <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false} 
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
        />
        </BrowserRouter>
    );
    const pagination = screen.queryByTestId('table-pagination');
    expect(pagination).toBeInTheDocument();
  })

  test(' doesnt show pagination' , () => {
    const handleChangeSelectedItems = jest.fn();

    render(
        <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={false}
          data={data}
          renderCheckbox={false} 
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
        />
        </BrowserRouter>
    );
    const pagination = screen.queryByTestId('table-pagination');
    expect(pagination).not.toBeInTheDocument();
  })
});
