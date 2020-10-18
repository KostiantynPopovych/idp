import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import xss from 'xss';

interface QueryParams {
  name?: string;
  description?: string;
  image?: string;
}

const PARAMS = ['name', 'description', 'image'];

const useQueryParams = (additionalFields: string | string[] = ''): QueryParams => {
  // region *******************************DATA*********************************
  const location = useLocation();
  // endregion

  return useMemo(() => {
    const search = new URLSearchParams(location.search);
    return PARAMS.concat(
      Array.isArray(additionalFields) ? additionalFields : [additionalFields]
    ).reduce(
      (el: Partial<QueryParams>, next: string) => ({
        ...el,
        ...(search.get(next) && { [next]: xss(search.get(next) as string) })
      }),
      {}
    );
  }, [additionalFields, location.search]);
};

export default useQueryParams;
