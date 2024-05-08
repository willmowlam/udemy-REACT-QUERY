# ESLint and Prettier Formatting

The Lazy Days Spa app comes with ESLint configuration, Prettier configuration, and VSCode settings to auto-format on save. If the auto-formatting isn't working in your setup, this might lead to tedious manual formatting before the code will run. Here are some suggestions if you're finding your code won't run without manual formatting:

1. Troubleshoot auto-format on save in VSCode

To auto-format on save in VSCode, make sure:

the ESLint extension is installed

the ESLint extension is not generating any errors in the output window

the folder you've opened in VSCode is the top level of your project, and not a parent directory



2. Auto-format from the command-line

If ESLint isn't working in your code editor, you can auto-fix anything auto-fixable by running this from the command-line (with the .eslintrc.json and .prettierrc.json files in place):

```eslint --fix src/ --ext ".jsx,.js,.ts,.tsx"```

3. Remove the linting/ formatting requirements altogether

If you're getting error messages and don't want to troubleshoot, you can delete .eslintrc.json and .prettierrc.json .



```Delete `␍`  prettier/prettier error```

or sometimes it looks like this:

![image](https://img-c.udemycdn.com/redactor/raw/article_lecture/2022-02-26_18-11-51-56e3bf3002666349b691802fa01b0d4e.png)

This error sometimes occurs on windows machines, due to line ending differences. Here are some things to try to resolve the error:

1. Run prettier on all of the files in the project (reference: create-react-app docs): 

```./node_modules/.bin/prettier --write "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}"```

2. Note: this will update your global git settings. Run git config --global core.autocrlf true and pull the code from GitHub again (or possibly re-clone the repo). (Reference: GitHub docs)

3. Remove the linting / formatting requirements altogether by deleting .eslintrc.json and .prettierrc.json . Note that this will also remove the benefits of linting and formatting as you're coding, so it should be used as a last resort.

----

Solutions that have already been applied to the course repo: 

1. update the prettier/prettier rule in the .eslintrc.json file:

```
"prettier/prettier": [
  "error",
  {
    "endOfLine": "auto"
  }
],
```

2. Set the line endings in .vscode/settings.json: 

```
{
    "files.eol": "\n",
}
```
