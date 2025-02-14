1. git hub创建 repository: react_bill, 仓库地址为 https://github.com/jding40/react_bill.git
2. `git add .`
3. `git commit -m "initialization"`
4. `git remote add react_bill https://github.com/jding40/react_bill.git`
5. `git push --set-upstream react_bill master`
   

**路径解析配置（webpack）**

craco插件(CRA本身把webpack配置包装到黑盒里无法直接修改，需要借助一个插件 - craco)
- 安装craco (Create React App Configuration Override)
  ```sh
  npm i -D @craco/craco
  ```
- 项目根目录下创建配置文件

  craco.config.js  

- 配置文件中添加路径解析配置  
- 包文件中配置启动和打包命令

**路径联想配置（vscode）**
- 新增一个`jsconfig.json`


