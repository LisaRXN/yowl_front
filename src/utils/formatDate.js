export function formatDate(date) {
  const newdate = new Date(date)

    return newdate.toLocaleDateString("en-EN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }