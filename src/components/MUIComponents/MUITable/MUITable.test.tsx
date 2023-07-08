import { render, screen, fireEvent, queryAllByText, queryAllByTestId } from '@testing-library/react';
import MUITable from '../MUITable';
import { RenderPokemonsColumns, RenderSelectedPokemonsColumns } from "../../../constants";
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import userEvent from '@testing-library/user-event';


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom") as any,
  useNavigate: jest.fn(),
}));

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

  const handleChangeSelectedItems = jest.fn();

  test('renders checkboxes when renderCheckbox is true', () => {


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

  test('render delete button', () => {


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

  test('doesnt render delete button', () => {


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

  test('show pagination', () => {


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

  test(' doesnt show pagination', () => {


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

  test('should render Skeleton when isFetching is true', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={false}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={true}
        />
      </BrowserRouter>
    );

    const skeletonElements = screen.getAllByTestId('skeleton');
    expect(skeletonElements.length).toBeGreaterThan(0);

    data.pokemon_v2_pokemon.forEach((pokemon) => {
      const pokemonIdCell = queryByText(pokemon.id.toString());
      expect(pokemonIdCell).toBeNull();

      const pokemonNameCell = queryByText(pokemon.name);
      expect(pokemonNameCell).toBeNull();

      const pokemonHeightCell = queryByText(pokemon.height.toString());
      expect(pokemonHeightCell).toBeNull();

      const pokemonBaseExperienceCell = queryByText(
        pokemon.base_experience.toString()
      );
      expect(pokemonBaseExperienceCell).toBeNull();

      const pokemonIsDefaultCell = queryByText(
        pokemon.is_default ? 'Yes' : 'No'
      );
      expect(pokemonIsDefaultCell).toBeNull();
    });
  });

  test('should render real data when isFetching is false', () => {

    const { getAllByText } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={false}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={false}
        />
      </BrowserRouter>
    );

    const skeletonElements = screen.queryAllByTestId('skeleton');
    expect(skeletonElements.length).toBe(0);

    data.pokemon_v2_pokemon.forEach((pokemon) => {
      const pokemonIdCell = getAllByText(pokemon.id.toString());
      pokemonIdCell.forEach((cell) => {
        expect(cell).toBeInTheDocument();
      })

      const pokemonNameCell = getAllByText(pokemon.name);
      pokemonNameCell.forEach((cell) => {
        expect(cell).toBeInTheDocument();
      })

      const pokemonHeightCell = getAllByText(pokemon.height.toString());
      pokemonHeightCell.forEach((cell) => {
        expect(cell).toBeInTheDocument();
      })

      const pokemonBaseExperienceCell = getAllByText(
        pokemon.base_experience.toString()
      );
      pokemonBaseExperienceCell.forEach((cell) => {
        expect(cell).toBeInTheDocument();
      })

      const pokemonIsDefaultCell = getAllByText(
        pokemon.is_default ? 'Yes' : 'No'
      );
      pokemonIsDefaultCell.forEach((cell) => {
        expect(cell).toBeInTheDocument();
      })
    });
  });
  test('should call handleChangeSelectedItems with correct arguments when Checkbox value changes', async () => {

    const { container } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={false}
          data={data}
          renderCheckbox={true}
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={false}
        />
      </BrowserRouter>
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    expect(handleChangeSelectedItems).toHaveBeenCalledTimes(checkboxes.length);

  });

  test('should call deleteSelectedPokemon with correct arguments when delete button is clicked', async () => {
    const deleteSelectedPokemon = jest.fn();

    const { queryAllByTestId } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderSelectedPokemonsColumns}
          showPagination={false}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={true}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={false}
          deleteSelectedPokemon={deleteSelectedPokemon}
        />
      </BrowserRouter>
    );

    const deleteButtonsList = queryAllByTestId('delete-button');

    deleteButtonsList.forEach((btn, index) => {
      fireEvent.click(btn);
      const pokemonId = data.pokemon_v2_pokemon[index].id;
      expect(deleteSelectedPokemon).toHaveBeenLastCalledWith(pokemonId);
    });

    expect(deleteSelectedPokemon).toHaveBeenCalledTimes(deleteButtonsList.length);

  });

  test('navigates to Pokemon details on name click', async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigate);


    const { queryAllByTestId } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={false}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={false}
        />
      </BrowserRouter>
    );

    const pokemonNameList = queryAllByTestId("pokemon-name");
    pokemonNameList.forEach((pokemonName) => {
      fireEvent.click(pokemonName);
    })

    data.pokemon_v2_pokemon.forEach((pokemon) => {
      expect(navigate).toHaveBeenCalledWith(`/pokemon/${pokemon.id}`);
    });
  });
  test('calls handleChangePage with correct arguments on page change', () => {
    const handleChangePage = jest.fn();
    const page = 1;
    const rowsPerPage = 10;

    render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={false}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
        />
      </BrowserRouter>
    );

    const nextButton = screen.getByTitle('Go to next page');
    fireEvent.click(nextButton);

    expect(handleChangePage).toHaveBeenCalledTimes(1);
    expect(handleChangePage).toHaveBeenCalledWith(expect.anything(), 2);
  });

  test('calls handleChangeRowsPerPage with correct arguments on page change', async () => {
    const handleChangeRowsPerPage = jest.fn();

    const page = 1;
    let rowsPerPage = 10;

    const { container } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          handleChangeSelectedItems={handleChangeSelectedItems}
          isFetching={false}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}

        />
      </BrowserRouter>
    );

    const select = container.querySelector(".MuiSelect-select") as HTMLHtmlElement;
    fireEvent.mouseDown(select);

    const popup = screen.getByRole('presentation');
    expect(popup).toBeInTheDocument();

    const optionElement = screen.getByRole('option', { name: '25' });
    userEvent.click(optionElement);

    expect(handleChangeRowsPerPage).toHaveBeenCalled();
  });

  test('check numbers of pokemons', async () => {

    const rowsPerPage = 10;

    const { container } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          isFetching={false}
          page={0}
          rowsPerPage={rowsPerPage}
        />
      </BrowserRouter>
    );
      const listOfPokemons = container.querySelectorAll('.MuiTableBody-root tr');
    expect(listOfPokemons.length).toBe(rowsPerPage);

  });

  test('render first pokemon', async () => {

    const rowsPerPage = 10;

    const { container } = render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          isFetching={false}
          page={0}
          rowsPerPage={rowsPerPage}
        />
      </BrowserRouter>
    );
    const row = container.querySelector('.MuiTableBody-root tr:first-child') as HTMLTableRowElement;
    const firstPokemon = data.pokemon_v2_pokemon[0];

    expect(row.textContent).toContain(firstPokemon.id.toString());
    expect(row.textContent).toContain(firstPokemon.name.toString());
    expect(row.textContent).toContain(firstPokemon.height.toString());
    expect(row.textContent).toContain(firstPokemon.base_experience.toString());
    expect(row.textContent).toContain(firstPokemon.is_default ? 'Yes' : 'No');
  });

  test('renders component without errors or warnings', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(
      <BrowserRouter>
        <MUITable
          columns={RenderPokemonsColumns}
          showPagination={true}
          data={data}
          renderCheckbox={false}
          renderDeleteButton={false}
          isFetching={false}
          page={0}
          rowsPerPage={10}
        />
      </BrowserRouter>
    );
    
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});
