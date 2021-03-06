一、配置Git
（1）第一个需要配置的就是用户的用户名和email，因为这些内容会出现在你的每一个提交（commit）里面的，

$ git config --global user.name "your name"
$ git config --global user.email "your_email"
Git的配置信息分为全局和项目两种，上面命令中带了“–global”参数，这就意味是在进行全局配置，它会影响本机上的每个一个Git项目。 
Git 可以为每个项目设定不同的配置信息，在命令行环境，进入Git项目所在目录，执行下面的命令：

$ git config user.name "your name"
$ git config user.email "your_email"

Git的设计哲学和Linux（*nix）一样，尽量的使用“文本化”（Textuality）；它里面尽量用文本化的形式存储信息，对于配置信息也更是如此，用户的这些配置信息全部是存储在文本文件中。Git的全局配置文件是存放在”~/.gitconfig”（用户目录下的.gitconfig）文件中： 
（2）在本地创建ssh key 
$ ssh-keygen -t rsa -C “your_email” 
将后面的your_email改为你的邮箱，也是你在github上注册的那个邮箱： 
直接点回车，说明会在默认文件id_rsa上生成ssh key。 
（3）验证是否成功，在git bash下输入

$ ssh -T git@github.com
回车就会看到：You’ve successfully authenticated, but GitHub does not provide shell access 。这就表示已成功连上github。 
（4）接下来我们要做的就是在本地电脑上新建一个仓库

 $ mkdir git_demo
 $cd git_demo
 $ git init
1>登录github帐号，点击 new a repository输入项目名称(例如：code)。

2>进入终端在当前目录下创建一个项目mkdir code,然后进入到该目录下 cd code.

3>检测项目到本地，在新建项目的页面右下角有HTTPS clone URL,复制项目的gitURL到粘贴版，使用git clone将URL粘贴到后面(git clone https://github.com/sugerchestnut/code.git)
将项目克隆到本地服务器。

4>进入到该项目cd code，
就会看到README.md文件也会被检出在本地环境中，
这样就会有一个本地工作区，
可以在本地工作区进行修改等一系列操作，然后提交。

5>将要上传的文件复制到该项目里，可以一次上传多个文件，
首先使用git status查看工作区状态，
再使用git add +项目里的文件名，
使git跟踪到新增的文件，(随时使用git status命令查看当前工作区状态)。

6>执行git commit命令执行本次提交的变更，
填写变更的评论(目的)，填写完后ctrl+c，ctrl+x退出。

7>此时工作区已经干净，没有要提交的文件了，
最后使用git push来发布本地的提交操作，
输入github帐号和密码。这样提交就完成了。
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－ 
今天又看了一遍廖雪峰老师的博客，总结了一点点Git命令： 
　　git init第一次创建本地仓库的时候，使用一次，再后面就不用了 
　　git add向本地仓库添加文件 
　 　git commit将添加进本地仓库的文件提交 
　　git diff查看对本地仓库中文件的改动 
　　git log查看提交本地仓库文件的日志（git log –pretty=online） 
　　git reset –hard HEAD^回退到上一个版本 
　　git diff HEAD – readme.txt命令可以查看工作区和版本库里面最新版本的区别 
　　git checkout – file可以丢弃工作区的修改 
　　git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区 
　　从版本库中删除文件，那就用命令git rm　文件名　删掉

  要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；

 关联后，使用命令git push -u origin master第一次推送master分支的所有内容；

 此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；

 要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。

 Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。
