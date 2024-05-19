export interface  DataI {
    data: any,
    catMeal: boolean,
    isFetchingNextPage: boolean,
    hasNextPage: boolean | undefined,
    fetchNextPage: () => {}
}