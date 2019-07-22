export const idToPath = id => {
  if (id === "bg") return [];

  let path = ["page"];
  const indices = id.split("_");
  indices.splice(0, 2);
  indices.forEach(index => {
    path.push("childComponents");
    path.push(parseInt(index));
  });
  return path;
};

export const pathToId = path => {
  if (!path || path.length === 0) return "bg";
  return `bg_${path.filter(x => x !== "childComponents").join("_")}`;
};
