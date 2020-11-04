# urlstatuschecker

## Set up the Tool

1. Copy and paste the link into your terminal with the command: `git clone https://github.com/hyunjiLeeTech/URL-FI.git`.
2. Move your current directory to urlstatuschecker then install all the dependencies using the npm command: `npm i`.
3. Make a symbolic link of the command using `npm link`.
4. Enter the command along with a filename to use the tool.

## Formatting using prettier

Urlstatuschecker uses 'Prettier' for formatting code.

run `npm run prettier` will auto fomatting all the code in project.
run `npm run prettier-check` will check are all files match the Prettier code style.
If you want to ignore certain files for prettier, add the file in the '.prettierignore' file.

For more information about Prettier, you can visit: [prettier](https://prettier.io/)

## Formatting using Linter

Urlstatuschecker use 'Linter' to formatting and avoid code patterns that lead to bugs. 

run `npm run eslint` to check any linter problem you need to fix before commit.
If you want to ignore certain files for prettier, add the file in the '.eslintignore' file.

For more information about Linter, you can visit: [Linter](https://eslint.org/)

## IDE Integration

Prittier and Linter will automatically working when you save files. If it does not work, please check install the recommendation extentions 'Prettier' and 'linter'.