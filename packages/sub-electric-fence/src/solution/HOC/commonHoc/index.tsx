import { backLoginFunction, createAuthHeaders } from '~/framework/util/base-http/request.service';
import React, { ReactElement, MemoExoticComponent, useCallback } from 'react';

export function COMMONHOC<T>(Component: MemoExoticComponent<(props: T & any) => ReactElement<any, any>>) {
  const createAuthHeadersCallBack = useCallback(() => createAuthHeaders(), []);
  const backLoginFunctionCallBack = useCallback(() => backLoginFunction(), []);
  const otherProps = { createAuthHeaders: createAuthHeadersCallBack, backLoginFunction: backLoginFunctionCallBack };
  return (props: T) => {
    const finalProps = { ...otherProps, ...props };
    return <Component {...finalProps}></Component>;
  };
}
