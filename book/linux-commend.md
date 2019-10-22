#linux 命令

## 软连接
1. 创建软链接

ln -s 【目标目录】 【软链接地址】
> 备注:

软链接创建需要同级目录下没有同名的文件。

2. 删除

rm -rf 【软链接地址】
> 备注:

上述指令中，软链接地址最后不能含有“/”，当含有“/”时，删除的是软链接目标目录下的资源，而不是软链接本身。

3. 修改

ln -snf 【新目标目录】 【软链接地址】

## scp上传

1. 上传文件

```shell
scp [filePath] [remote.userName]@[remote.ip||host]:[savePath]
```
> 示例

```shell
scp ./dam_web.tgz dangpenghao@192.168.1.1:/home/dangpenghao/test
```
2. 上传目录
上传目录需要加上 -r 参数
> 示例

```shell
scp -r ./dam_web/ dangpenghao@192.168.1.1:/home/dangpenghao/dam_web
```
dam_web目录下的所有文件上传到服务器上的目录内
3. scp配置免密操作

  * 生成密钥
  * 上传密钥到服务器

> 具体操作如下

```shell
cd ~/.ssh/
// 如果已经生产过密钥可以直接把公钥上传
ssh-keygen  -t  rsa
// 如果远程登陆机不存在.ssh目录需要执行创建文件操作 `mkdir .ssh`
scp id_rsa.pub dangpenghao@192.168.1.1:/home/dangpenghao/.ssh
mv id_rsa.pub authorized_keys
// 如果已经存在`authorized_keys`文件需要追加到文件
ssh-keygen -i -f id_rsa.pub >>authorized_keys

```
4. scp的其他参数

option | 含义
:-:|:-:
-1 | 强制scp命令使用协议ssh1  
-2 |  强制scp命令使用协议ssh2  
-4 |  强制scp命令只使用IPv4寻址  
-6 |  强制scp命令只使用IPv6寻址  
-B |  使用批处理模式（传输过程中不询问传输口令或短语）  
-C |  允许压缩。（将-C标志传递给ssh，从而打开压缩功能）  
-p |  保留原文件的修改时间，访问时间和访问权限。  
-q |  不显示传输进度条。  
-r |  递归复制整个目录。  
-v | 详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。   
-c | cipher  以cipher将数据传输进行加密，这个选项将直接传递给ssh。   
-F | ssh_config  指定一个替代的ssh配置文件，此参数直接传递给ssh。  
-i | identity_file  从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。    
-l | limit  限定用户所能使用的带宽，以Kbit/s为单位。     
-o | ssh_option  如果习惯于使用ssh_config(5)中的参数传递方式，   
-P | port  注意是大写的P, port是指定数据传输用到的端口号   
-S |  program  指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。

