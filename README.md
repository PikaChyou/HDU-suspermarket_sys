大二下册的数据库实验课的大作业  
主题是超市管理系统，时间紧任务重，花了周末两天拉了坨大的出来，大部分的代码都是屎山中的屎山，没有任何优化，能跑起来就算赢

# 前端

前端采用的框架是 Vite+React，并且在其中用了大量的 antd 组件  
鉴权啥的是根本没有，登录页面就是个摆设，直接输对应的网址也能一步直达

# 后端

后端使用 go 自带的 web 服务器编写，也异常臃肿与丑陋  
服务器架设在华为云上，数据库老老实实用的 MySQL，安全啥的也是压根没管，直接对所有 IP 开放了 root 权限  
反正也没人用不是么
