# Common Data


## HoCs
```js
withLoading (isLoading: (props) => bool, LoadingComponent: ReactComponent): (WrappedComponent) => EnhancedComponent
```

```js
withPlaceholder (isEmpty: (props) => bool, PlaceholderComponent: ReactComponent): (WrappedComponent) => EnhancedComponen

//  Injected Props
{
  injected props:
  initialLoading: bool,
  activelyRefetching: bool,
  passivelyRefetching: bool,
  fetchingMore: bool
}
```

```js
withApolloData: (WrappedComponent) => EnhancedComponent
```


```js
enhancedGraphql(query: ApolloQuery, config: ApolloConfig, { LoadingComponent: ReactComponent, PlaceholderComponent: ReactComponent, ErrorComponent:ReactComponent }): (WrappedComponent) => EnhancedComponent
```
