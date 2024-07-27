function parseContactType(value) {
  const type = ['work', 'home', 'personal'];

  if (type.includes(value)) {
    return value;
  }
  return undefined;
}

function parseIsFavorite(value) {
  const type = ['true', 'false'];

  if (type.includes(value)) {
    return value;
  }
  return undefined;
}

export function parseFilterParams(query) {
  return {
    isFavourite: parseIsFavorite(query.isFavourite),
    contactType: parseContactType(query.contactType),
  };
}
