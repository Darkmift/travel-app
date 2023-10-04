export function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  // Replace spaces with hyphens and remove commas
  return formattedDate.replace(/,|\s/g, '-');
}
