import xss from "xss";

export default function (data: { [key: string ]: unknown }) {
  return Object.entries(data).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: xss(value as string)
  }) , {});
};
