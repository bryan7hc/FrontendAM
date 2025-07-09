const slugify = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar tildes
    .replace(/[^\w\s-]/g, "") // quitar símbolos
    .trim()
    .replace(/\s+/g, "-"); // reemplazar espacios por guiones

export default slugify;
