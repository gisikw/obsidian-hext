---

kanban-plugin: basic

---

## Backlog

- [ ] Come up with a system such that a user can manage their own terrain / symbol dictionary in settings
- [ ] Fullscreen the map on click?
- [ ] Enhance syntax to support inline links, and make those SVG elements links
- [ ] Generate point crawl from labeled points
- [ ] Generate downloadable/printable png
- [ ] Create two categories of offsets - points of interest and terrain decoration
- [ ] Fix incorrect icon offsets
- [ ] #bugfix Clear out rendered SVGs associated with a particular file on close of that file
- [ ] Render labels in each hex
- [ ] Render coordinates in each hex
- [ ] Update the HexGeometry node type and the HexPixelTransformer to support pointy-top hexes
- [ ] Support Paths
- [ ] Refactor the AST transforms to avoid mutating nodes rather than replacing them?
- [ ] Add strict types to ASTNode classes


## Todo

- [ ] Write an SVGTagTransformer that adds .svgPre and .svgPost to nodes
- [ ] Write an SVGGenerator that overwrites visit. Concat the .svgPre, super(), then the .svgPost


## In Progress

- [ ] Continue writing AST transforms until we get an SVG output
- [ ] Write a TerrainTransformer that transforms terrain keys into background colors


## Done

- [ ] Figure out why the codeblockprocessor doesn't automatically update - if the snippet is changed, live-preview updates. But reading view is stuck with a cached version.
- [ ] Generate a static SVG that auto-replaces code snippets
- [ ] Add testing infrastructure
- [ ] Enable hot-reloading
- [ ] Extract the mapMap to a cache singleton
- [ ] Move SVG render of Hex into Hex
- [ ] Parse terrain labels and set Hex backgrounds accordingly




%% kanban:settings
```
{"kanban-plugin":"basic"}
```
%%