# nesting_demo
An example of @nest not working with css modules.

To see example, run `yarn install`, then `yarn build`.

CSS written in `src/Button/Button.css`
```
.container {
  padding: .5rem;
}

.value {
  size: 1.5rem;
}

.primary {
  background-color: blue;
  @nest .container & .value {
    color: pink
  }
}
```

CSS expected
```
.Button__container__12nb-{padding:.5rem}
.Button__value__3i9_C{size:1.5rem}.Button__primary__3ReFs{background-color:#00f}
.Button__container__12nb- .Button__primary__3ReFs .Button__value__3i9_C{color:pink}
```

CSS returned in `dist/index.css`
```
.Button__container__12nb-{padding:.5rem}
.Button__value__3i9_C{size:1.5rem}.Button__primary__3ReFs{background-color:#00f}
.container .Button__primary__3ReFs .value{color:pink}
```