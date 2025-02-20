const targetBaseUrl = `${process.cwd()}/site_docs`;
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const replaceFile = (file) => {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) throw err;
  
    // 修改文件内容
    data = data.replace(/> demo: ([-0-9a-z .]*)[\n|\r\n]/g, (_match, $1) => {
      const [left, right, type] = $1.split(' ');
      const target = path.resolve('packages/nutui-taro-demo/src', type, 'pages', left, `${right}.vue`);
      let code = '';
      try {
        code = fs.readFileSync(target, 'utf-8');
      } catch (err) {
        code =
          '[script] copy:h5 File not found: ' + target;
        console.warn(code);
      }
      return code ? `:::demo

\`\`\`vue
${code}
\`\`\`

:::\n` : '';
    });
  
    fs.writeFile(file, data, function(err) {
      if (err) throw err;
    });
  });
}
const copyFile = (from, to) => {
  fse
    .copy(from, to)
    .then(() => {
      console.log('success!>', to);
      replaceFile(to);
    })
    .catch((err) => {
      console.error(err);
    });
};
const removeFile = async (url) => {
  return new Promise((res, rej) => {
    fse.remove(url, (err) => {
      if (err) {
        throw err;
      }
      res(true);
    });
  });
};

const copy = async () => {
  let configPath = `src/config.json`;
  let configPkgPath = `package.json`;
  let nutuiDocsConfigPath = `${targetBaseUrl}/config.json`;

  // 判断 site_docs 文件是否存在根路径中
  const existsRoot = await fse.pathExists(targetBaseUrl);

  if (existsRoot) await removeFile(targetBaseUrl);
  // 复制所有组件
  const fromConfig = await fse.readJson(configPath);
  fromConfig.nav.forEach(({ packages }) => {
    packages.forEach((item) => {
      if (item.show) {
        let cmpName = item.name.toLowerCase();
        let doctaropath = `src/packages/__VUE/${cmpName}/doc.taro.md`;
        fse.readFile(doctaropath, (err, data) => {
          if (!err) {
            copyFile(doctaropath, `${targetBaseUrl}/docs/${cmpName}/doc.taro.md`);
          }
        });
      }
    });
  });

  // 复制 config.json
  const fromPkgConfig = await fse.readJson(configPkgPath);

  const obj = {
    version: '',
    nav: [],
    docs: []
  };
  fse.outputJSON(nutuiDocsConfigPath, obj, () => {
    const docsConfig = fse.readJson(nutuiDocsConfigPath);
    docsConfig.version = fromPkgConfig.version;
    docsConfig.nav = fromConfig.nav;
    docsConfig.docs = fromConfig.docs;
    // docsConfig.demoUrl = 'https://nutui.jd.com/3x/demo.html#';
    docsConfig.demoUrl = 'https://nutui.jd.com/taro/vue/4x/demo.html#/pages/index/index';
    fse
      .writeJson(nutuiDocsConfigPath, docsConfig, {
        spaces: 2
      })
      .then(() => {
        console.log(`${fromPkgConfig.version} success!`);
      });
  });
};
// copy(reactBaseUrl, 'react');
copy();