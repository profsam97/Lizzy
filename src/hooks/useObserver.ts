import React from "react";

export const useObserver =  (isFetchingNextPage : boolean, hasNextPage : boolean | undefined, fetchNextPage: () => {}) => {

    const observer = React.useRef<IntersectionObserver>();
    return React.useCallback(
          (node: any) => {
              if (isFetchingNextPage) return;
              if (observer.current) observer.current.disconnect();
              observer.current = new IntersectionObserver((entries) => {
                  if (entries[0].isIntersecting && hasNextPage) {
                      fetchNextPage();
                  }
              });
              if (node) observer.current.observe(node);
          },
          [isFetchingNextPage, fetchNextPage, hasNextPage])
}