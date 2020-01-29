#git操作相关

## .gitignore不生效执行
```bash
  git rm -r --cached .
  git add .
  git commit -m 'update .gitignore'
```
## 回退未提交的代码到上次push

```bash
git checkout package.json
git checkout ./src/index.js
```
## 修改commit信息
```bash
git commit --amend
```
## 回滚代码
```bash
git reset --hard <commitid>
```

## 找到已回滚的代码的commit
```bash
git reflog
```
## 获取指定commit的代码包括已回退的commit
```bash
git cherry-pick <commit>
```
[git时光机](https://github.com/airuikun/blog/issues/5)