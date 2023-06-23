export const getSelectedItemsFromLocalStorage = (): number[] => {
    const selectedItems = localStorage.getItem("pokeApiSelectedItems");
    return selectedItems ? JSON.parse(selectedItems) : [];
  };
  
  export const updateSelectedItemsInLocalStorage = (selectedItems: number[]): void => {
    localStorage.setItem("pokeApiSelectedItems", JSON.stringify(selectedItems));
  };