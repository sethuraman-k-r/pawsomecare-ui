import { ItemProps, MenuDataProps } from "../props/MenuProps";

export function generateMenus(items: Array<ItemProps>): MenuDataProps {
  let menuDatum: MenuDataProps = {};
  items.forEach((item) => {
    const headingLevelId = item.heading_level_id;
    const headingLevel = item.heading_level;
    if (Object.keys(menuDatum).includes(headingLevelId.toString())) {
      const existedItems = menuDatum[headingLevelId].items;
      existedItems.push(item);
      menuDatum[headingLevelId] = {
        heading_level_id: headingLevelId,
        heading_level: headingLevel,
        heading_hash: "",
        items: existedItems,
      };
    } else {
      menuDatum[headingLevelId] = {
        heading_level_id: headingLevelId,
        heading_level: headingLevel,
        heading_hash: "",
        items: [item],
      };
    }
  });
  return menuDatum;
}
