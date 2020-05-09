# express-graphql demo

这应该是现在最不推崇的实现方式，是在太琐碎了。

不过用来理解`graphql-js`的基础还是很有用处。

这个demo的`data-source`部分我就随便写了一个`model`应付，请根据实际情况对接数据源。

# usage
1. 到`/register`路径去注册一个用户，或者去`/login`去登陆一个id，id为10以内随便一个数，密码为1234。这样就能获取一个有效cookie，用于mutation操作
2. 到`/graphql`路径，进行基本的crud。

# todo
1. 补全offset分页
2. 补全cursor分页
3. relay cursor分页
