const normalizeToItem = (data: object) => ({
  fields: {
    ...(Object.entries(data).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: {
        'en-US': value
      }
    }), {}))
  }
});

const normalizeFromItem = (e: ItemWrap) =>
  ({...Object.entries(e.fields).reduce((acc, [key, value]) =>
      ({...acc, [key]: value && value['en-US'] }), {}), id: e.sys.id, version: e.sys.version});

export { normalizeFromItem, normalizeToItem };
