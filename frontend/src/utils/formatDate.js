export const formatDate = (str) =>
  new Date(str).toLocaleString('fr-FR', {
    dateStyle: "medium",
    timeStyle: "short"
  });