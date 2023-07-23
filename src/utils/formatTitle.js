export function formatTitle(title) {
  let parts = title.split('__');
  let formattedTitle = parts.map((part) => {
    return part
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  });

  return formattedTitle.join(' / ');
}
