# Changelog

## 0.3.3 (2026-03-10)

Full Changelog: [v0.3.2...v0.3.3](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.3.2...v0.3.3)

### Chores

* **internal:** update dependencies to address dependabot vulnerabilities ([17f20a6](https://github.com/parallel-web/parallel-sdk-typescript/commit/17f20a687efdd187f588d770bbd8d31013d42a4b))

## 0.3.2 (2026-03-09)

Full Changelog: [v0.3.1...v0.3.2](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.3.1...v0.3.2)

### Features

* **api:** add betas back in for search ([88ffc07](https://github.com/parallel-web/parallel-sdk-typescript/commit/88ffc0723b8ad725b626d47d95d45cc088a97bd9))
* **api:** sync openapi spec ([8b8c04d](https://github.com/parallel-web/parallel-sdk-typescript/commit/8b8c04d813a6f29274cb0e0a416539e0ec7aa5d4))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([b5891d2](https://github.com/parallel-web/parallel-sdk-typescript/commit/b5891d2e289ba683e2f977cf52199b8185d1a375))
* **client:** avoid removing abort listener too early ([971bc60](https://github.com/parallel-web/parallel-sdk-typescript/commit/971bc60f78633e423d4434cc64cbf56a3fe2a08d))
* **client:** preserve URL params already embedded in path ([0aa4a14](https://github.com/parallel-web/parallel-sdk-typescript/commit/0aa4a148cf3bfc956a1d9de358695df75dbd214e))
* **docs/contributing:** correct pnpm link command ([0fba230](https://github.com/parallel-web/parallel-sdk-typescript/commit/0fba230efc58ec8db7e3b97e498c970e9d5a42f3))


### Chores

* **ci:** skip uploading artifacts on stainless-internal branches ([4d15af4](https://github.com/parallel-web/parallel-sdk-typescript/commit/4d15af4c852abb1422cb3b79579e4f76b837c1d4))
* **client:** do not parse responses with empty content-length ([5f852e5](https://github.com/parallel-web/parallel-sdk-typescript/commit/5f852e53c6d293dcdd940bcb1fc741b2215c5023))
* **client:** restructure abort controller binding ([09b3c0f](https://github.com/parallel-web/parallel-sdk-typescript/commit/09b3c0fdd35a41325408f2304488c41c4fcf44e4))
* format all `api.md` files ([112a9ed](https://github.com/parallel-web/parallel-sdk-typescript/commit/112a9ede4af725999c475e62a590a2273abc6dfe))
* **internal/client:** fix form-urlencoded requests ([645d7f8](https://github.com/parallel-web/parallel-sdk-typescript/commit/645d7f8e772f781bf86a77b1f35b2ddb6cd215eb))
* **internal:** avoid type checking errors with ts-reset ([8f10069](https://github.com/parallel-web/parallel-sdk-typescript/commit/8f100690328b09531482ec54e4cf38e0b0d59a9b))
* **internal:** codegen related update ([ffdc333](https://github.com/parallel-web/parallel-sdk-typescript/commit/ffdc333a95868e11c587facb0ffb3b4f68e2fbad))
* **internal:** codegen related update ([f66750f](https://github.com/parallel-web/parallel-sdk-typescript/commit/f66750f2632f5e9f32dc2e334c9472fb7aebc7a5))
* **internal:** move stringifyQuery implementation to internal function ([2cf4c15](https://github.com/parallel-web/parallel-sdk-typescript/commit/2cf4c156bfa74dd29369f77b60ab5fc4281fe1be))
* **test:** do not count install time for mock server timeout ([3b3f3ed](https://github.com/parallel-web/parallel-sdk-typescript/commit/3b3f3ed79c2ce888d831ed7a26c3a8dcde085ce0))
* update mock server docs ([004672e](https://github.com/parallel-web/parallel-sdk-typescript/commit/004672ea0157df3c026277c5d892849bb0b9a9fe))

## 0.3.1 (2026-01-28)

Full Changelog: [v0.3.0...v0.3.1](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.3.0...v0.3.1)

### Chores

* **api:** make headers optional ([34c42bc](https://github.com/parallel-web/parallel-sdk-typescript/commit/34c42bcab5ef7b8672002ee0c9ac752a8bffad14))
* **ci:** upgrade `actions/github-script` ([cc6296c](https://github.com/parallel-web/parallel-sdk-typescript/commit/cc6296c80f464c4e2411e1e6524d02eec1ad48c9))
* fix typo in descriptions ([7a1e6da](https://github.com/parallel-web/parallel-sdk-typescript/commit/7a1e6da03b86d4eee18179b04e8f3bcce5651dfb))
* **internal:** update `actions/checkout` version ([80a2a97](https://github.com/parallel-web/parallel-sdk-typescript/commit/80a2a97a0c81c308edd03bbd0835ad31cb1b9b9b))
* **internal:** upgrade babel, qs, js-yaml ([32a9dee](https://github.com/parallel-web/parallel-sdk-typescript/commit/32a9dee83c6dd3ba998123bb5bfdae30e6bf3d1d))

## 0.3.0 (2026-01-13)

Full Changelog: [v0.2.4...v0.3.0](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.2.4...v0.3.0)

### Features

* **api:** add after_date, update findAll nomenclature ([d32f54b](https://github.com/parallel-web/parallel-sdk-typescript/commit/d32f54b4958d0f47135e3f6e612ebd92cd5a139f))
* **api:** Update excerpt settings ([58c9f47](https://github.com/parallel-web/parallel-sdk-typescript/commit/58c9f47cd642a29a3daf5e6efcf75462639376ac))
* **ci:** add breaking change detection workflow ([7cff646](https://github.com/parallel-web/parallel-sdk-typescript/commit/7cff646f03b344932da9b1f41a2194935c0ecca5))


### Bug Fixes

* **api:** add aliases for old findAll types ([d06ae98](https://github.com/parallel-web/parallel-sdk-typescript/commit/d06ae9826af167dd35cf54a98ce5d80b00dbb833))
* **mcp:** correct code tool API endpoint ([e9a925c](https://github.com/parallel-web/parallel-sdk-typescript/commit/e9a925cc5da68a7da81a78826df3a6b71d87e7b5))
* **mcp:** return correct lines on typescript errors ([d6854e6](https://github.com/parallel-web/parallel-sdk-typescript/commit/d6854e660599668a38c679df3c60f311b1569a4a))


### Chores

* **api:** update default headers ([e7bcf21](https://github.com/parallel-web/parallel-sdk-typescript/commit/e7bcf210dcfcef9e444218abdf7f0d8d4dfc7d13))
* break long lines in snippets into multiline ([148860c](https://github.com/parallel-web/parallel-sdk-typescript/commit/148860cb2d1fe30406d81f7eee60c51203dfad68))
* **client:** fix logger property type ([2d7f64b](https://github.com/parallel-web/parallel-sdk-typescript/commit/2d7f64b25314670de513eda5cb70d2c3b70300fd))
* fix lint ([d8fff0a](https://github.com/parallel-web/parallel-sdk-typescript/commit/d8fff0aa2479182e4b51e58fc8757911d5c06c5a))
* **internal:** codegen related update ([d941a00](https://github.com/parallel-web/parallel-sdk-typescript/commit/d941a00eb40c9c3cd056da2fd6955d2aade94849))
* **internal:** codegen related update ([bc0b8b1](https://github.com/parallel-web/parallel-sdk-typescript/commit/bc0b8b1167be0a5426a1d151e6bcefb7d884fe0c))
* **internal:** codegen related update ([5ae66ee](https://github.com/parallel-web/parallel-sdk-typescript/commit/5ae66ee9239566c97fe41dd591acf8f58a3252bb))
* **internal:** upgrade eslint ([e6780b0](https://github.com/parallel-web/parallel-sdk-typescript/commit/e6780b01053f2ef5a09dd544b32223f1cfc2db9b))

## 0.2.4 (2025-11-13)

Full Changelog: [v0.2.3...v0.2.4](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.2.3...v0.2.4)

### Features

* **api:** FindAll sdk updates ([77128c1](https://github.com/parallel-web/parallel-sdk-typescript/commit/77128c106ed5082564e47119c47878992509837e))
* **api:** manual updates ([c6432f5](https://github.com/parallel-web/parallel-sdk-typescript/commit/c6432f5fe15e3a125413c4a78100323970c915c9))

## 0.2.3 (2025-11-06)

Full Changelog: [v0.2.2...v0.2.3](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.2.2...v0.2.3)

### Features

* **api:** add fetch_policy and mode to /v1beta/search ([9d7d6b8](https://github.com/parallel-web/parallel-sdk-typescript/commit/9d7d6b86b152b36f6a7256357edd5b38d9ffdf50))


### Bug Fixes

* **api:** add back /v1/tasks/runs?=beta ([f48bf1e](https://github.com/parallel-web/parallel-sdk-typescript/commit/f48bf1eba76bd85583db400ae4029daa3cce3670))
* **api:** Make beta headers optional in /v1beta/extract ([54eb7ae](https://github.com/parallel-web/parallel-sdk-typescript/commit/54eb7ae2e0b8f011eaa1deef2d3c7aa2d8f91d1b))
* **api:** re-add deprecated max_chars_per_result ([59fb216](https://github.com/parallel-web/parallel-sdk-typescript/commit/59fb2163dcac335c9ae15086e02b7acee4a9ba5b))
* **api:** re-add deprecated processor to /v1beta/extract ([48f615b](https://github.com/parallel-web/parallel-sdk-typescript/commit/48f615bac482902f0ef3ed5964da023ec269526d))
* **api:** remove full_content from /v1beta/search output ([4bd528d](https://github.com/parallel-web/parallel-sdk-typescript/commit/4bd528dccac2aa5ed04d50648198073ade75ac2e))

## 0.2.2 (2025-10-22)

Full Changelog: [v0.2.1...v0.2.2](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.2.1...v0.2.2)

### Bug Fixes

* **api:** default beta headers for v1beta/search and v1beta/extract ([f4e52ca](https://github.com/parallel-web/parallel-sdk-typescript/commit/f4e52cac80e1f6a666e40fd17f0e44002001757f))

## 0.2.1 (2025-10-21)

Full Changelog: [v0.2.0...v0.2.1](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.2.0...v0.2.1)

### Features

* **api:** manual updates ([1215c78](https://github.com/parallel-web/parallel-sdk-typescript/commit/1215c7868330a32b185163a1234db5a1b5b23e3c))

## 0.2.0 (2025-10-21)

Full Changelog: [v0.1.2...v0.2.0](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.1.2...v0.2.0)

### Features

* **api:** Add /v1beta/extract ([a709400](https://github.com/parallel-web/parallel-sdk-typescript/commit/a7094002235d15e4a5f68422b9447127b9448b4b))

## 0.1.2 (2025-10-07)

Full Changelog: [v0.1.1...v0.1.2](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.1.1...v0.1.2)

### Features

* **api:** Add progress meter to Task Run events ([ad361b3](https://github.com/parallel-web/parallel-sdk-typescript/commit/ad361b31f97286eed338be1388ab9806415596fa))


### Performance Improvements

* faster formatting ([173a244](https://github.com/parallel-web/parallel-sdk-typescript/commit/173a24423a23158782abe3f831bb0b8dc5eec5d9))


### Chores

* do not install brew dependencies in ./scripts/bootstrap by default ([285367b](https://github.com/parallel-web/parallel-sdk-typescript/commit/285367bd65f7b796416e7cbe151e771da85a3be6))
* **internal:** codegen related update ([ab2b45e](https://github.com/parallel-web/parallel-sdk-typescript/commit/ab2b45e909e512425400eb88f811fb34fdb48d2a))
* **internal:** fix incremental formatting in some cases ([dbe176c](https://github.com/parallel-web/parallel-sdk-typescript/commit/dbe176c606c8914cb803b302c43a93faf795147d))
* **internal:** ignore .eslintcache ([7d0c511](https://github.com/parallel-web/parallel-sdk-typescript/commit/7d0c511c79edc77690bd87be97e09789b768f541))
* **internal:** remove .eslintcache ([6998e86](https://github.com/parallel-web/parallel-sdk-typescript/commit/6998e8695537208a66139c4b61f59caf4aaf4a66))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([aa7ffe8](https://github.com/parallel-web/parallel-sdk-typescript/commit/aa7ffe8af4fd9128e0da20a1702ef2f9b791a915))
* **internal:** use npm pack for build uploads ([799079d](https://github.com/parallel-web/parallel-sdk-typescript/commit/799079d180e8f2f691b8f28f27080ea4f465ceda))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([5ed9433](https://github.com/parallel-web/parallel-sdk-typescript/commit/5ed9433661eacf6cb55f0a854ba68915862f737e))

## 0.1.1 (2025-09-15)

Full Changelog: [v0.1.0...v0.1.1](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.1.0...v0.1.1)

### Features

* **api:** Allow nullable text schemas ([855642a](https://github.com/parallel-web/parallel-sdk-typescript/commit/855642a846b1f746b53e29c3c34400b857457c43))


### Bug Fixes

* coerce nullable values to undefined ([077555c](https://github.com/parallel-web/parallel-sdk-typescript/commit/077555c9ae59da02a2500a2664e5128bce51eedc))


### Chores

* ci build action ([9cebcc7](https://github.com/parallel-web/parallel-sdk-typescript/commit/9cebcc7efaa12eb64002b2f9e765594c4e2bdd8b))

## 0.1.0 (2025-09-01)

Full Changelog: [v0.0.1-alpha.0...v0.1.0](https://github.com/parallel-web/parallel-sdk-typescript/compare/v0.0.1-alpha.0...v0.1.0)

### Features

* **api:** update via SDK Studio ([f4b9bff](https://github.com/parallel-web/parallel-sdk-typescript/commit/f4b9bff96e41c4e31546276be440fb8f721ef595))
* **api:** update via SDK Studio ([7a985fb](https://github.com/parallel-web/parallel-sdk-typescript/commit/7a985fbf420eed89c87940cef40efb650b554c9b))
* **api:** update via SDK Studio ([bea2209](https://github.com/parallel-web/parallel-sdk-typescript/commit/bea220934b8d11d97e35599dbc68ef3e69bb9523))
* **api:** update via SDK Studio ([e555533](https://github.com/parallel-web/parallel-sdk-typescript/commit/e5555331ceb4722741248522936df737ab26176e))
* **api:** update via SDK Studio ([e0922b7](https://github.com/parallel-web/parallel-sdk-typescript/commit/e0922b7ab408dd85495164111d53c3b9a1967da9))
* **api:** update via SDK Studio ([496a13a](https://github.com/parallel-web/parallel-sdk-typescript/commit/496a13a6922fc072d62c34fa5fb9917824bee881))
* **api:** update via SDK Studio ([bb43e98](https://github.com/parallel-web/parallel-sdk-typescript/commit/bb43e9850dcb30878dc67d8d5422917d951645b9))
* **client:** add support for endpoint-specific base URLs ([6ca9e40](https://github.com/parallel-web/parallel-sdk-typescript/commit/6ca9e405e47920c42ab274da43a40f20864fa7c7))
* **client:** add withOptions helper ([2dc5df5](https://github.com/parallel-web/parallel-sdk-typescript/commit/2dc5df50cfca28e611a360559c694889b9592939))


### Bug Fixes

* **client:** always overwrite when merging headers ([1b74500](https://github.com/parallel-web/parallel-sdk-typescript/commit/1b745008bbcff7583e8483a3989225fb6eb2719e))
* **client:** explicitly copy fetch in withOptions ([1e3c4cb](https://github.com/parallel-web/parallel-sdk-typescript/commit/1e3c4cbb08404440b34dc10dc67beb273fa658f3))
* **client:** get fetchOptions type more reliably ([c90df05](https://github.com/parallel-web/parallel-sdk-typescript/commit/c90df05c6ed462bffb1004861f33ed3f2ff4cdcc))
* compat with more runtimes ([b197b9f](https://github.com/parallel-web/parallel-sdk-typescript/commit/b197b9ffc02621b1743ba5ff52b59b524aef94b1))
* publish script — handle NPM errors correctly ([4c38358](https://github.com/parallel-web/parallel-sdk-typescript/commit/4c38358bade9566927ba83f123b06ea70d4c2140))


### Chores

* add docs to RequestOptions type ([6aae9a9](https://github.com/parallel-web/parallel-sdk-typescript/commit/6aae9a9b10709a8b53886f74e1a768f1b25e66d0))
* adjust eslint.config.mjs ignore pattern ([1685764](https://github.com/parallel-web/parallel-sdk-typescript/commit/1685764727dd8d217dad3a24257dac5777839b44))
* avoid type error in certain environments ([dc40584](https://github.com/parallel-web/parallel-sdk-typescript/commit/dc405849f7a23810049ea0409f9bdf4db785d149))
* change publish docs url ([cd7500b](https://github.com/parallel-web/parallel-sdk-typescript/commit/cd7500b70c2ec7d1dc9534a582619042be13eb53))
* **ci:** enable for pull requests ([2bd8a50](https://github.com/parallel-web/parallel-sdk-typescript/commit/2bd8a5000c5e442499ab1e7bd4186303e6e0539b))
* **ci:** only run for pushes and fork pull requests ([07a77b8](https://github.com/parallel-web/parallel-sdk-typescript/commit/07a77b81a447dc1b0f195a44db309913cd6eebcf))
* **client:** drop support for EOL node versions ([ae8f0d0](https://github.com/parallel-web/parallel-sdk-typescript/commit/ae8f0d0732f35ae967d1285cd3b6255f78822031))
* **client:** improve path param validation ([c64babf](https://github.com/parallel-web/parallel-sdk-typescript/commit/c64babf6852c1f078b4151f1a9a9e047686dc21f))
* **client:** refactor imports ([9ed8458](https://github.com/parallel-web/parallel-sdk-typescript/commit/9ed845857b38ff482b624eb171a4767965ce6562))
* **deps:** bump eslint-plugin-prettier ([326f222](https://github.com/parallel-web/parallel-sdk-typescript/commit/326f222fd6f1f305370681a2aad70ee2776f62e1))
* **docs:** grammar improvements ([9afb7db](https://github.com/parallel-web/parallel-sdk-typescript/commit/9afb7db5530567fc606fc2084172705b5cf3a627))
* **docs:** use top-level-await in example snippets ([15c8ab4](https://github.com/parallel-web/parallel-sdk-typescript/commit/15c8ab49b9e9438ccbb3b066def8d2c4ef0f8748))
* go live ([5e6dbbb](https://github.com/parallel-web/parallel-sdk-typescript/commit/5e6dbbb6f668125403e5261b6ce4bc80861eb627))
* improve publish-npm script --latest tag logic ([9feb9eb](https://github.com/parallel-web/parallel-sdk-typescript/commit/9feb9eb2fb9ee5d993872a8b8bc4ce30180f8084))
* **internal:** add pure annotations, make base APIResource abstract ([cf3a8d2](https://github.com/parallel-web/parallel-sdk-typescript/commit/cf3a8d27388f773c166c8283b0e89e9a16ae04e4))
* **internal:** codegen related update ([7dfd25b](https://github.com/parallel-web/parallel-sdk-typescript/commit/7dfd25bb7ed0a0b7d6a40d74d137b7f2d34c332c))
* **internal:** fix readablestream types in node 20 ([340f07e](https://github.com/parallel-web/parallel-sdk-typescript/commit/340f07e2c4f1db967f2f00c909b1283c5b0dbad3))
* **internal:** refactor utils ([95c2945](https://github.com/parallel-web/parallel-sdk-typescript/commit/95c2945cef58d5d7b13c968c70de500148705720))
* **internal:** share typescript helpers ([fa5b3f1](https://github.com/parallel-web/parallel-sdk-typescript/commit/fa5b3f1e6e9ad059adf73bc8475455247ec71df3))
* **internal:** update jest config ([b740c53](https://github.com/parallel-web/parallel-sdk-typescript/commit/b740c5312f264b90fd8b8690a5770209486f2e1f))
* make some internal functions async ([ae148ed](https://github.com/parallel-web/parallel-sdk-typescript/commit/ae148ede844821590bb04b6b5f07e7419660cda4))
* **package:** remove engines ([8c81289](https://github.com/parallel-web/parallel-sdk-typescript/commit/8c812899a5099a2a5fae23d9863effef9ae66581))
* **readme:** update badges ([10d3e6a](https://github.com/parallel-web/parallel-sdk-typescript/commit/10d3e6abff37d19ad633430f390f8d899d069bb3))
* **readme:** use better example snippet for undocumented params ([6b403ec](https://github.com/parallel-web/parallel-sdk-typescript/commit/6b403ecc4ed7dc04bf80d719cd357b3bfd32d47e))
* **ts:** reorder package.json imports ([4e6e456](https://github.com/parallel-web/parallel-sdk-typescript/commit/4e6e456893e96f2fb0d6cbbf4022193e4207f99e))


### Documentation

* **readme:** fix typo ([0c499fe](https://github.com/parallel-web/parallel-sdk-typescript/commit/0c499fe10500f3a667941cf8acbdf5d88cb67182))


### Refactors

* **types:** replace Record with mapped types ([ab87e9c](https://github.com/parallel-web/parallel-sdk-typescript/commit/ab87e9c8c2fdceaf24a3f310647bf0912c1c3dcb))
