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

## 暂存代码

```bash
// 暂存代码 
git stash 
git stash save "save message"
/**
新增的文件需要先 `git add .` ，否则无法暂存新增文件
**/
// 查看暂存的记录
git stash list 
// 获取暂存代码
git stash pop
// 获取制定暂存代码
git stash pop $num

// 丢弃stash@{$num}存储，从列表中删除这个存储
git stash drop stash@{$num} 

// 删除所有缓存的stash
git stash clear 

//应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，
git stash apply

// 如果要使用其他个，比如第二个：git stash apply stash@{1} 
git stash apply stash@{$num} 

```
