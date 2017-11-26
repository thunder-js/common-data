# Common Data


## HoCs
```
withLoading (isLoading: (props) => bool, LoadingComponent: ReactComponent): (WrappedComponent) => EnhancedComponent
```

```
withPlaceholder (isEmpty: (props) => bool, PlaceholderComponent: ReactComponent): (WrappedComponent) => EnhancedComponen

injected props:
initialLoading: bool,
activelyRefetching: bool,
passivelyRefetching: bool,
fetchingMore: bool
```

```
withApolloData: (WrappedComponent) => EnhancedComponent
```


```
enhancedGraphql(query: ApolloQuery, config: ApolloConfig, { LoadingComponent: ReactComponent, PlaceholderComponent: ReactComponent, ErrorComponent:ReactComponent }): (WrappedComponent) => EnhancedComponent
```
