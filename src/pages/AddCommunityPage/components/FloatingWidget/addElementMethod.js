/*
 * Different contexts:
 * 1. Generic Component is selected
 * 2. Container Item is selected
 * 3. Container is selected
 * 4. Page is selected
 * 5. Background is selected
 * 6. Nothing is selected
 *
 * Actions:
 * 1. Add after Generic Component
 * 2. Add after last element inside of Container Item
 * 3. Try to add new item inside new Container Item. If max no. of CI's exceeded, raise error.
 * 4-6. Append to the last object in the page.
 *
 */

// https://stackoverflow.com/questions/45517254/react-binding-this-to-an-imported-function
export function handleItemAddClick(e, clickedItem) {
  const {activeComponent} = this.props;

  console.log("clicked item", clickedItem, "with selected component", activeComponent);
}
