# 地址
https://juejin.im/post/5e76eb30518825491b11ecf1

# 总结
1.导入模块的顺序
// node_modules
import React from 'react'
import { Button } from '@material-ui/core'
import axios from 'axios'

// Local modules
import { DatePicker } from '../../components'
import { toCamelCase } from '../utils'

// Types + Interfaces
import { IUser } from '../../models/User'

2.尽可能使用解构
const UserProfile = ({ firstName, lastName, profilePhoto }) =>
  (<div>
    <span>{firstName}</span>
    <span>{lastName}</span>
    <img src={profilePhoto}/>
  </div>)

3.变量和方法的命名约定
let user = {}
user.hasCar = true
user.isAdmin = true

function getUser() {
  return user
}

function setUserPhoto(photoUrl) {
  user.photoUrl = photoUrl
}

对于布尔类型使用：is, has,should做前缀
对于方法使用 get/set 做前缀如果是操作 props
变量和方法都使用驼峰命名

4.为你的组件接收公共变量做好准备
const UserProfile = props => {
  const { firstName, lastName, profilePhoto, ...rest} = props
  return (<div {...rest}>
    <span>{firstName}</span>
    <span>{lastName}</span>
    <img src={profilePhoto}/>
  </div>)
}

5.哑组件（dumb components）让开发更简单

// UserProfilePage.jsx
// 操作所有的UserProfilePage相关，添加任何额外的props或业务逻辑

import { fetchUser } from '../api'

const UserProfilePage = props => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const user = fetchUser(error => console.error(error))
    if(user.country === "DE") {
      user.flag = "/de-flag.png"
    } else if(user.country === "MX") {
      user.flag = "/mx-flag.png"
    }
    setUser(user);
  }
  return <UserProfile {...user}/>
}

// API.js
// 获取数据并处理错误

export const fetchUser = async (errorHandler) => {
  try {
    const user = await axios.get('/user/25')
    retrun user
  } catch(error) {
    errorHandler(error)
  }
}

// UserProfile.jsx
// UserProfile.jsx如下

const UserProfile = props => {
  const { firstName, lastName, profilePhoto, ...rest} = props
  return (<div {...rest}>
    <span>{firstName}</span>
    <span>{lastName}</span>
    <img src={profilePhoto}/>
  </div>)
}
