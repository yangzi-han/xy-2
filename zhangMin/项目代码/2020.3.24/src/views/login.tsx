import React from 'react'
import RequestPort from '../until/request1'
class Login extends React.Component<any>{
  state = {
    username: '',
    password: '',
    isShow: false
  }
   // 登录 
   getLog = ()=>{
    let {username,password,isShow} = this.state
    console.log(username,password)
    if(username.length===0&&password.length===0){
        alert('账号和密码不能为空')
    }else{
        RequestPort('/login/json',{username,password}).then(data=>{
            alert(data)
            if(data==='没有注册此账号'){
                this.setState({isShow:!isShow,username:'',password:''})
            }else{
                this.props.history.push('/index/home/room')
            }
            
        })
    }
}
// 注册
getReg = ()=>{
    let {username,password,isShow} = this.state
    if(username.length===0&&password.length===0){
        alert('账号和密码不能为空')
    }else{
        RequestPort('/regLog/json',{username,password}).then(data=>{
            console.log(data)
            if(data==='注册成功') this.setState({isShow:!isShow,username:'',password:''})
            
        })
    }
}
  render() {
    let { username, password, isShow } = this.state
    return <div>
        <div style={{ margin: 0, width: '100%', height: 30, background: 'yellowGreen' }}>login</div>
        <p>
            账号：
            <input value={username} type="text" onChange={(e) => { this.setState({ username: e.target.value }) }} />
        </p>
        <p>
            密码：
            <input value={password} type="text" onChange={(e) => { this.setState({ password: e.target.value }) }} />
        </p>
        {
            isShow ?
                <button onClick={()=>{this.getReg()}}>注册</button> :
                <div>
                    <button onClick={() => { this.getLog() }}>登录</button>
                    <div onClick={() => {this.setState({isShow:!isShow,username:'',password:''})}}>还没有账号？去注册</div>
                </div>

        }

    </div>
  }
}
export default Login